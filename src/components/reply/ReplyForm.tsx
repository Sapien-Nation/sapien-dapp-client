import { parse } from 'node-html-parser';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useController, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

// api
import { createReply } from 'api/replies';

// components
import { Editor } from 'components/common';

// constants
import { initialEditorValue } from 'constants/initialEditorValue';

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
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm();
  const { field: editorField } = useController({
    control,
    name: 'document',
    defaultValue: initialEditorValue,
  });
  const [hasContent, setHasContent] = useState(false);
  

  const { asPath, push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (editorField.value !== initialEditorValue) {
      setHasContent(true);
    } else {
      setHasContent(false);
    }
  }, [editorField]);

  const onSubmitForm = async ({ document }) => {
    try {
      const dataSerialized = document
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
    } catch (err) {
      enqueueSnackbar('Oops, something went wrong. Please try again.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Box alignItems="flex-end" display="flex" style={{ gap: 10 }}>
        <Editor
          editorProps={{
            placeholder: 'Write a comment...',
          }}
          isSubmitting={isSubmitting}
          hasContent={hasContent}
          {...editorField}
        />
      </Box>
    </form>
  );
};

export default ReplyForm;
