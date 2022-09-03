import { useSWRConfig } from 'swr';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

// api
import { createRoom } from 'api/room';

// components
import { Dialog, Select, TextInput } from 'components/common';

// hooks
import { useToast } from 'context/toast';
import { useTribeRooms } from 'hooks/tribe';

interface Props {
  contentId: string;
  tribeId: string;
  onClose: () => void;
}

interface CreateThreadFormValues {
  title: string;
  message: string;
  roomId: string;
}

const CreateThreadDialog = ({ contentId, tribeId, onClose }: Props) => {
  const rooms = useTribeRooms();
  const toast = useToast();
  const { query } = useRouter();
  const { mutate } = useSWRConfig();

  const channelID = query.viewID as string;
  const postID = query.id as string;

  // should mutate only on posts list, not on post details view
  const mutateFeed = postID === undefined;

  const options = rooms?.map((room) => ({
    id: room.id,
    value: room.id,
    name: room.name,
  }));

  const methods = useForm<CreateThreadFormValues>({
    defaultValues: {
      title: '',
      message: '',
      roomId: '',
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = methods;

  const onSubmit = async ({
    title,
    message,
    roomId,
  }: CreateThreadFormValues) => {
    try {
      const room = {
        aboutObject: 'CONTENT',
        aboutObjectId: contentId,
        name: title,
        tribeId: tribeId,
        message: message,
        roomParentId: roomId,
      };
      const response = await createRoom(room);

      if (mutateFeed) {
        mutate(
          `/core-api/channel/${channelID}/feed`,
          (feed: { data: Array<any>; nextCursor: string }) => {
            return {
              ...feed,
              data: feed.data.map((post) => {
                if (post.id === contentId) {
                  return {
                    ...post,
                    threads: [
                      ...post.threads,
                      {
                        archived: false,
                        ...response,
                      },
                    ],
                  };
                }

                return post;
              }),
            };
          },
          false
        );
      }

      onClose();
    } catch (error) {
      toast({
        message: error || 'Service unavailable',
      });
    }
  };

  return (
    <Dialog
      form={'create-thread'}
      show
      confirmLabel="Create"
      isFetching={isSubmitting}
      onClose={onClose}
      title="Create Thread"
    >
      <FormProvider {...methods}>
        <form
          className="mt-3"
          onSubmit={handleSubmit(onSubmit)}
          id="create-thread"
        >
          <div className="flex flex-col gap-7">
            <TextInput name="title" placeholder="Title" />
            <TextInput name="message" placeholder="Message" />
            <Select
              defaultValue={options[0].value}
              name="roomId"
              items={options}
            />
          </div>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default CreateThreadDialog;
