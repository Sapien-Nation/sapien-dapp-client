import { parse } from 'node-html-parser';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';

// api
import { createReply } from 'api/replies';

// components
import { Editor } from 'components/common';

// utils
import { serialize } from 'utils/slate';

// mui
import { Box } from '@material-ui/core';

// types
import type { Content as ContentType } from 'tools/types/content';

interface Props {
  contentID: string;
  redirect?: boolean;
  onSubmit?: (reply: ContentType) => void;
}

const ReplyForm = ({ contentID, onSubmit, redirect = false }: Props) => {
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
  const { asPath, push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmitForm = async ({ content }) => {
    try {
      const dataSerialized = content
        .map((node: any) => serialize(node))
        .join('');

      const body = {
        data: dataSerialized,
      };

      const rawHTML = parse(dataSerialized);
      const preview =
        rawHTML.querySelector('img')?.rawAttributes?.['data-fileKey'];

      if (preview) {
        // @ts-ignore
        body.preview = preview;
      }

      const reply = await createReply(contentID, body);

      if (redirect) {
        push(`${asPath}/content/${contentID}`);
      } else {
        onSubmit(reply);
      }

      setClearText(true);
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Oops, something went wrong. Please try again.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
    setClearText(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Box alignItems="flex-end" display="flex" style={{ gap: 10 }}>
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <Editor
              clearText={Boolean(clearText)}
              editorProps={{
                placeholder: 'Write a comment...',
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

export default ReplyForm;
