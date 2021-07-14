import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';

// components
import { Editor } from 'components/common';

// mui
import { Box } from '@material-ui/core';

const ReplyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      //TODO - submit method
      // await onSubmit(content);
      console.log('Content', content);

      //TODO - clear editor from parent
      // @ts-ignore
      // setData(initialEditorValue);
    } catch (err) {
      enqueueSnackbar(err.message);
    }
    setIsSubmitting(false);
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
