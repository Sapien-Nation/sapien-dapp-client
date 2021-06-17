import { Editor, EditorState } from 'draft-js';
import { Controller, useForm } from 'react-hook-form';

// utils
import { decorators } from 'utils/draftjs';

// icons
import SendIcon from '@material-ui/icons/Send';

// mui
import { Avatar, Box, IconButton } from '@material-ui/core';

// types
import type { EditorState as EditorStateType } from 'draft-js';
import type { User } from 'tools/types/user';

// styles
import { primary } from 'styles/colors';

interface FormValues {
  audios?: Array<File>;
  editorState: EditorStateType;
  images?: Array<File>;
}

interface Props {
  user: User;
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
        <IconButton
          style={{
            backgroundColor: primary,
            borderRadius: 16,
          }}
          type="submit"
        >
          <SendIcon fontSize="small" style={{ color: '#FFF' }} />
        </IconButton>
      </Box>
    </form>
  );
};

export default CreateContentForm;
