import { Controller, useForm } from 'react-hook-form';
import { useMemo, useCallback } from 'react';

// editor
import { createEditor, BaseEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';

// icons
import SendIcon from '@material-ui/icons/Send';

// mui
import { Avatar, Box, IconButton } from '@material-ui/core';

// types
import type { User } from 'tools/types/user';

// styles
import { primary } from 'styles/colors';

// utils
import { decorate, Leaf } from 'utils/slate';

interface FormValues {
  audios?: Array<File>;
  editorState: Descendant[];
  images?: Array<File>;
}

interface Props {
  user: User;
  handleContentSubmit: (values: FormValues) => void;
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string };

const CreateContentForm = ({ user, handleContentSubmit }: Props) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const { control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      audios: [],
      editorState: [],
      images: [],
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log('Values: ', values);
    handleContentSubmit(values);
  };

  const onChange = (value) => {
    console.log('Values: ', value);
    setValue('editorState', value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" padding={3} style={{ gap: 10 }}>
        <Avatar src={user.avatar}>{user.username[0].toUpperCase()}</Avatar>
        <Controller
          control={control}
          name="editorState"
          render={({ field: { value, ...rest } }) => (
            <Box style={{ width: '100%', minWidth: 680 }}>
              <Slate
                editor={editor}
                value={value}
                onChange={onChange}
                {...rest}
              >
                <Editable
                  decorate={decorate}
                  placeholder={`What’s on your mind, ${user.username}?`}
                  renderLeaf={renderLeaf}
                />
              </Slate>
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
