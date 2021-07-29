import { parse } from 'node-html-parser';
import { useSnackbar } from 'notistack';
import { useController, useForm } from 'react-hook-form';

// api
import { createContent } from 'api/content';

// components
import { Editor } from 'components/common';

// constants
import { initialEditorValue } from 'constants/initialEditorValue';

// mui
import { Avatar, Box } from '@material-ui/core';

// utils
import { serialize } from 'utils/slate';

// types
import type { User } from 'tools/types/user';
import { useEffect, useState } from 'react';

interface Props {
  setIsCreating: any;
  user: User;
  onSave: () => void;
  squareID: string;
}

const CreateContentForm = ({
  setIsCreating,
  user,
  onSave,
  squareID,
}: Props) => {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
  } = useForm();
  const { field: editorField } = useController({
    control,
    name: 'document',
    defaultValue: initialEditorValue,
  });
  const [hasContent, setHasContent] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (editorField.value !== initialEditorValue) {
      setHasContent(true);
    } else {
      setHasContent(false);
    }
  }, [editorField]);

  const onSubmit = async ({ document }) => {
    setIsCreating(true);
    try {
      const dataSerialized = document
        .map((node: any) => serialize(node))
        .join('');

      const body = {
        data: dataSerialized,
        squareId: squareID,
      };

      const rawHTML = parse(dataSerialized);
      const preview =
        rawHTML.querySelector('img')?.rawAttributes?.['data-fileKey'];

      if (preview) {
        (body as any).preview = preview;
      }

      await createContent(body);

      onSave();
      setValue('document', initialEditorValue);

      enqueueSnackbar('Post created successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    } catch (error) {
      enqueueSnackbar('Oops, something went wrong. Please try again.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
    setIsCreating(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box alignItems="flex-end" display="flex" style={{ gap: 10 }}>
        <Avatar src={user.avatar}>{user.username[0].toUpperCase()}</Avatar>
        <Editor
          editorProps={{
            placeholder: `What’s on your mind, ${user.username}?`,
          }}
          hasContent={hasContent}
          isSubmitting={isSubmitting}
          {...editorField}
        />
      </Box>
    </form>
  );
};

export default CreateContentForm;
