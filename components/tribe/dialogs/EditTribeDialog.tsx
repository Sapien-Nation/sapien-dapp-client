import { useState } from 'react';
import { useSWRConfig } from 'swr';

// api
import { editTribe, CreateTribeBody } from 'api/tribe';

// components
import TribeForm from './TribeForm';
import { Dialog } from 'components/common';

// hooks
import { useToast } from 'context/toast';

// types
import type { FormValues } from './TribeForm';
import type { MainFeedTribe, ProfileTribe } from 'tools/types/tribe';

interface Props {
  onClose: () => void;
  tribe: MainFeedTribe;
}

const form = 'edit-tribe-form';

const mediaDefaultKey = '__DEFAULT_MEDIA';
const EditTribeDialog = ({ onClose, tribe }: Props) => {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate } = useSWRConfig();

  const onSubmit = async ({ avatar, cover, description, name }: FormValues) => {
    setIsSubmitting(true);
    try {
      const body: CreateTribeBody = {
        description,
        name,
      };

      if (avatar === null) {
        Object.assign(body, {
          avatar: null,
        });
      } else if (avatar.key !== mediaDefaultKey) {
        Object.assign(body, {
          avatar: avatar.key,
        });
      }

      if (cover === null) {
        Object.assign(body, {
          cover: null,
        });
      } else if (cover.key !== mediaDefaultKey) {
        Object.assign(body, {
          cover: cover.key,
        });
      }

      const response = await editTribe(tribe.id, body);

      mutate(`/core-api/tribe/${tribe.id}`, () => response, true);
      mutate(
        '/core-api/user/tribes',
        (tribes: Array<ProfileTribe>) =>
          tribes.map((cacheTribe) => {
            if (cacheTribe.id === tribe.id) {
              return {
                ...cacheTribe,
                name: response.name,
                avatar: response.avatar,
              };
            }

            return cacheTribe;
          }),
        false
      );
      onClose();
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
      title="Edit Tribe"
      form={form}
      confirmLabel="Save"
    >
      <TribeForm
        form={form}
        defaultValues={{
          avatar: tribe.avatar
            ? { url: tribe.avatar, key: mediaDefaultKey }
            : null,
          cover: tribe.cover
            ? { url: tribe.cover, key: mediaDefaultKey }
            : null,
          description: tribe.description,
          name: tribe.name,
        }}
        onSubmit={onSubmit}
        isEdit
      />
    </Dialog>
  );
};

export default EditTribeDialog;
