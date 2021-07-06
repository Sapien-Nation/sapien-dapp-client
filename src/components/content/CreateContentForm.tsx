import { useState } from 'react';
import { withHistory } from 'slate-history';
import { useSnackbar } from 'notistack';
import { createEditor, Descendant } from 'slate';
import { withReact } from 'slate-react';

// components
import { Editor } from 'components/common';

// mui
import { Avatar, Box, IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';

// types
import type { User } from 'tools/types/user';

// styles
import { primary } from 'styles/colors';

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
      <Box alignItems="center" display="flex" padding={3} style={{ gap: 10 }}>
        <Avatar src={user.avatar}>{user.username[0].toUpperCase()}</Avatar>
        <Box style={{ width: '100%' }}>
          <Editor
            editor={editor}
            editorProps={{
              placeholder: `What’s on your mind, ${user.username}?`,
            }}
            value={data}
            onChange={setData}
          />
        </Box>
        <IconButton
          disabled={isSubmitting}
          style={{
            backgroundColor: primary[800],
            borderRadius: 16,
          }}
          type="submit"
        >
          <Send fontSize="small" style={{ color: '#FFF' }} />
        </IconButton>
      </Box>
    </form>
  );
};

export default CreateContentForm;
