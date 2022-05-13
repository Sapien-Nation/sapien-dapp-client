import { useState } from 'react';

// api
import { editTribe, CreateTribeBody } from 'api/tribe';

// components
import TribeForm from './TribeForm';
import { Dialog } from 'components/common';

// hooks
import { useToast } from 'context/toast';

// types
import type { FormValues } from './TribeForm';
import type { MainFeedTribe } from 'tools/types/tribe';

interface Props {
  onClose: () => void;
  tribe: MainFeedTribe;
}

const form = 'edit-tribe-form';

const EditTribeDialog = ({ onClose, tribe }: Props) => {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formDefaultValues = {
    avatar: { key: tribe.avatar, url: tribe.avatar },
    cover: { key: tribe.cover, url: tribe.cover },
    description: tribe.description,
    identifier: tribe.identifier,
    name: tribe.name,
  };

  const onSubmit = async ({
    description,
    identifier,
    name,
    ...rest
  }: FormValues) => {
    setIsSubmitting(true);
    try {
      const body: CreateTribeBody = {
        description,
        identifier,
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

      await editTribe(tribe.id, body);

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
        formDefaultValues={formDefaultValues}
        onSubmit={onSubmit}
        isEdit
      />
    </Dialog>
  );
};

export default EditTribeDialog;
