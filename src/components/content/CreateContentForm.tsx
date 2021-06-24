import { useState } from 'react';
import { withHistory } from 'slate-history';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

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
  Element,
  withShortcuts,
  withLinks,
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
      withShortcuts,
      withLinks,
      withHistory,
      withReact
    )(createEditor())
  );
  // @ts-ignore
  const [data, setData] = useState<Array<Descendant>>(initialEditorValue);

  const onSubmitForm = async (event) => {
    setIsSubmitting(true);
    try {
      event.preventDefault();

      await onSubmit(data);

      clearEditor(editor);

      // @ts-ignore
      setData(initialEditorValue);
    } catch (err) {
      //
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Box display="flex" padding={3} style={{ gap: 10 }}>
        <Avatar src={user.avatar}>{user.username[0].toUpperCase()}</Avatar>
        <Box style={{ width: '100%', minWidth: 680 }}>
          <Slate editor={editor} value={data} onChange={setData}>
            <Editable
              placeholder={`What’s on your mind, ${user.username}?`}
              renderElement={(props) => <Element {...props} />}
            />
          </Slate>
        </Box>
        <IconButton
          disabled={isSubmitting}
          style={{
            backgroundColor: primary,
            borderRadius: 16,
            marginTop: 'auto',
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
