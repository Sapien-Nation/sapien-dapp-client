import { useState } from 'react';
import { withHistory } from 'slate-history';
import { useSnackbar } from 'notistack';
import { createEditor, Descendant } from 'slate';
import { withReact } from 'slate-react';

// components
import { Editor } from 'components/common';

// mui
import { Avatar, Box, IconButton } from '@material-ui/core';
import { ImageOutlined, Send } from '@material-ui/icons';

// types
import type { User } from 'tools/types/user';

// styles
import { neutral, primary } from 'styles/colors';

// utils
import {
  clearEditor,
  composeSlateHighOrderFns,
  withImages,
  withLinks,
  withShortcuts,
} from 'utils/slate';

interface Props {
  user: User;
  onSubmit: (values: any) => void;
}

const initialEditorValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const CreateContentForm = ({ user, onSubmit }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editor] = useState(() =>
    composeSlateHighOrderFns(
      withImages,
      withShortcuts,
      withLinks,
      withHistory,
      withReact
    )(createEditor())
  );
  // @ts-ignore
  const [data, setData] = useState<Array<Descendant>>(initialEditorValue);
  const { enqueueSnackbar } = useSnackbar();

  const hasContent = () => {
    const position = editor.selection?.anchor;
    const offset = position?.offset;
    const path = position?.path[0];

    if (editor.selection && (offset !== 0 || path !== 0)) {
      return true;
    }

    return false;
  };

  const onSubmitForm = async (event) => {
    setIsSubmitting(true);
    try {
      event.preventDefault();

      await onSubmit(data);

      clearEditor(editor);

      // @ts-ignore
      setData(initialEditorValue);
    } catch (err) {
      enqueueSnackbar(err.message);
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Box alignItems="flex-end" display="flex" style={{ gap: 10 }}>
        <Avatar src={user.avatar}>{user.username[0].toUpperCase()}</Avatar>
        <Box
          borderRadius={16}
          display="flex"
          flexDirection={hasContent() ? 'column' : 'row'}
          padding={0.5}
          style={{ backgroundColor: neutral[50] }}
          width="100%"
        >
          <Editor
            editor={editor}
            editorProps={{
              placeholder: `What’s on your mind, ${user.username}?`,
            }}
            value={data}
            onChange={setData}
          />
          <Box
            display="flex"
            justifyContent="flex-end"
            padding={hasContent() ? 0.5 : 0}
          >
            <IconButton
              style={{
                borderRadius: 10,
                height: 40,
                width: 40,
              }}
            >
              <ImageOutlined fontSize="small" style={{ color: neutral[400] }} />
            </IconButton>
            <IconButton
              disabled={isSubmitting}
              style={{
                backgroundColor: hasContent() ? primary[800] : '',
                borderRadius: 10,
                height: 40,
                width: 40,
              }}
              type="submit"
            >
              <Send
                fontSize="small"
                style={{
                  color: hasContent() ? '#fff' : neutral[400],
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default CreateContentForm;
