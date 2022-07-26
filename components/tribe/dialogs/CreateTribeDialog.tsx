import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

// api
import { createTribe, CreateTribeBody } from 'api/tribe';

// components
import TribeForm from './TribeForm';
import { Dialog } from 'components/common';

// hooks
import { useToast } from 'context/toast';

// types
import type { FormValues } from './TribeForm';
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  onClose: () => void;
}

const form = 'create-tribe-form';

const CreateTribeDialog = ({ onClose }: Props) => {
  const toast = useToast();
  const { push } = useRouter();
  const { mutate } = useSWRConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async ({ description, name, ...rest }: FormValues) => {
    setIsSubmitting(true);
    try {
      const body: CreateTribeBody = {
        description,
        name,
      };

      if (rest.avatar) {
        Object.assign(body, {
          avatar: rest.avatar.key,
        });
      }

      if (rest.cover) {
        Object.assign(body, {
          cover: rest.cover.key,
        });
      }

      const response = await createTribe(body);

      mutate(
        '/core-api/user/tribes',
        (tribes: Array<ProfileTribe>) => [
          tribes[0],
          {
            ...response,
            permissions: {
              canCreateRoom: true,
              canDeleteRoom: true,
              canEditTribe: true,
              canCreateChannel: true,
              canLeaveTribe: false,
            },
          },
          ...tribes.slice(1),
        ],
        false
      );

      onClose();
      push(`/tribes/${response.id}/home`);
    } catch (error) {
      toast({
        message: error,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog
      show
      isFetching={isSubmitting}
      onClose={onClose}
      title="Create a Tribe"
      form={form}
      confirmLabel="Create"
    >
      <TribeForm
        form={form}
        defaultValues={{
          avatar: null,
          cover: null,
          description: '',
          name: '',
        }}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};

export default CreateTribeDialog;
