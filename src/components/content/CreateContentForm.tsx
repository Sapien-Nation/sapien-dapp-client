import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';

// components
import { Editor } from 'components/common';

// mui
import { Avatar, Box } from '@material-ui/core';

// types
import type { User } from 'tools/types/user';

interface Props {
  user: User;
  onSubmit: (values: any) => void;
}

const CreateContentForm = ({ user, onSubmit }: Props) => {
  const [clearText, setClearText] = useState(false);
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      content: '',
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const onSubmitForm = async ({ content }) => {
    try {
      await onSubmit(content);

      setClearText(true);
    } catch (err) {
      enqueueSnackbar(err.message);
    }

    setClearText(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Box alignItems="flex-end" display="flex" style={{ gap: 10 }}>
        <Avatar src={user.avatar}>{user.username[0].toUpperCase()}</Avatar>
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <Editor
              clearText={Boolean(clearText)}
              editorProps={{
                placeholder: `What’s on your mind, ${user.username}?`,
              }}
              isSubmitting={isSubmitting}
              {...field}
            />
          )}
        />
      </Box>
    </form>
  );
};

export default CreateContentForm;
