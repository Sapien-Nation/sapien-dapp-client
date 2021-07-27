import { useCallback, useMemo, useRef, useState } from 'react';
import { withHistory } from 'slate-history';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

// constants
import { Picker } from 'emoji-mart';

// hooks
import { useEmoji, useEditorConfig, useImage, useSelection } from 'hooks';

// mui
import { Box, IconButton, Menu } from '@material-ui/core';
import {
  ImageOutlined,
  Send,
  SentimentSatisfiedOutlined,
} from '@material-ui/icons';

// styles
import { neutral, primary } from 'styles/colors';

// utils
import { composeSlateHighOrderFns, withLinks } from 'utils/slate';

import 'emoji-mart/css/emoji-mart.css';

interface Props {
  editorProps: any;
  isSubmitting: boolean;
  onChange: (editor: any) => void;
  value: any;
}

const Editor = ({ editorProps = {}, isSubmitting, onChange, value }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const imageRef = useRef(null);

  //------------------------------------------------------------------------
  // TODO useMemo
  const editor = useMemo(
    () =>
      composeSlateHighOrderFns(
        withLinks,
        withHistory,
        withReact
      )(createEditor()),
    []
  );
  const { renderElement, renderLeaf } = useEditorConfig(editor);
  const [, selection, setSelection] = useSelection(editor);

  //------------------------------------------------------------------------
  const addImage = useImage(editor, selection);
  const addEmoji = useEmoji(editor, selection);

  //------------------------------------------------------------------------
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const onChangeLocal = useCallback(
    (doc) => {
      onChange(doc);
      setSelection(editor.selection);
    },
    [onChange, setSelection, editor]
  );

  // TODO
  const hasContent = true;

  return (
    <Box
      borderRadius={16}
      display="flex"
      flexDirection={hasContent ? 'column' : 'row'}
      padding={0.5}
      style={{ backgroundColor: neutral[50] }}
      width="100%"
    >
      <Slate editor={editor} value={value} onChange={onChangeLocal}>
        <Editable
          spellCheck
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          style={{
            padding: '0.7rem 1.5rem',
            width: '100%',
          }}
          {...editorProps}
        />
      </Slate>
      <Box
        display="flex"
        justifyContent="flex-end"
        padding={hasContent ? 0.5 : 0}
      >
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          disabled={isSubmitting}
          style={{
            borderRadius: 10,
            height: 40,
            width: 40,
          }}
          onClick={handleClick}
        >
          <SentimentSatisfiedOutlined
            fontSize="small"
            style={{
              color: neutral[400],
            }}
          />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          id="simple-menu"
          open={Boolean(anchorEl)}
          onClick={handleClose}
          onClose={handleClose}
        >
          <Picker onSelect={(event) => addEmoji(event)} />
        </Menu>
        <IconButton
          style={{
            borderRadius: 10,
            height: 40,
            width: 40,
          }}
          onClick={() => imageRef.current.click()}
        >
          <ImageOutlined fontSize="small" style={{ color: neutral[400] }} />
        </IconButton>
        <input
          ref={imageRef}
          hidden
          accept="image/*"
          type="file"
          onChange={addImage}
        />
        <IconButton
          disabled={isSubmitting || !hasContent}
          style={{
            backgroundColor: hasContent ? primary[800] : '',
            borderRadius: 10,
            height: 40,
            width: 40,
          }}
          type="submit"
        >
          <Send
            fontSize="small"
            style={{
              color: hasContent ? '#fff' : neutral[400],
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Editor;
