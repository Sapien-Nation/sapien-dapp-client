import { Editor, EditorState } from 'draft-js';
import { Controller, useForm } from 'react-hook-form';
import { decorators } from 'utils/draftjs';

// mui
import { Avatar, Box } from '@material-ui/core';

// types
import type { EditorState as EditorStateType } from 'draft-js';

interface FormValues {
  audios?: Array<File>;
  editorState: EditorStateType;
  images?: Array<File>;
}

interface Props {
  user: { avatar: string; username: string };
}

const CreateContentForm = ({ user }: Props) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      audios: [],
      editorState: EditorState.createEmpty(decorators),
      images: [],
    },
  });

  const onSubmit = (values: FormValues) => console.log(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" padding={3} style={{ gap: 10 }}>
        <Avatar src={user.avatar}>{user.username[0].toUpperCase()}</Avatar>
        <Controller
          control={control}
          name="editorState"
          render={({ field: { value, ...rest } }) => (
            <Box style={{ width: '100%', minWidth: 680 }}>
              <Editor
                {...rest}
                editorState={value}
                placeholder={`What’s on your mind, ${user.username}?`}
              />
            </Box>
          )}
        />
      </Box>
    </form>
  );
};

export default CreateContentForm;
