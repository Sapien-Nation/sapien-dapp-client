import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';

// api
import { createReply } from 'api/content';

// components
import { Editor } from 'components/common';

// utils
import { serialize } from 'utils/slate';

// mui
import { Box } from '@material-ui/core';

interface Props {
  contentID: string;
  redirect?: boolean;
  onSubmit?: () => void;
}

const ReplyForm = ({ contentID, onSubmit, redirect = false }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clearText, setClearText] = useState(false);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      content: '',
    },
  });
  const { asPath, push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const setFormValue = (data: any) => setValue('content', data);

  const onSubmitForm = async ({ content }) => {
    setIsSubmitting(true);
    try {
      await createReply(contentID, {
        data: content.map((node: any) => serialize(node)).join(''),
      });

      enqueueSnackbar('Replied');

      if (redirect) {
        push(`${asPath}/content/${contentID}`);
      } else {
        onSubmit();
      }

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
        <Controller
          control={control}
          name="content"
          render={({ field }) => {
            return (
              <>
                <Editor
                  clearText={Boolean(clearText)}
                  editorProps={{
                    placeholder: 'Write a comment...',
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

export default ReplyForm;
