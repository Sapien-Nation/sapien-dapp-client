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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clearText, setClearText] = useState(false);
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      content: '',
    },
  });

  // @ts-ignore
  const { enqueueSnackbar } = useSnackbar();
  const [content] = watch(['content']);

  const setFormValue = (data: any) => setValue('content', data);

  const onSubmitForm = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(content);

      // @ts-ignore
      setClearText(true);
    } catch (err) {
      enqueueSnackbar(err.message);
    }
    setIsSubmitting(false);
    setClearText(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Box alignItems="flex-end" display="flex" style={{ gap: 10 }}>
        <Avatar src={user.avatar}>{user.username[0].toUpperCase()}</Avatar>
        <Controller
          control={control}
          name="content"
          render={({ field }) => {
            return (
              <>
                <Editor
                  clearText={Boolean(clearText)}
                  editorProps={{
                    placeholder: `What’s on your mind, ${user.username}?`,
                  }}
                  isSubmitting={isSubmitting}
                  onChange={setFormValue}
                  {...field}
                />
              </>
            );
          }}
        />
      </Box>
    </form>
  );
};

export default CreateContentForm;
