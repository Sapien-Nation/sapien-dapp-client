import { Editable, Slate, withReact } from 'slate-react';
import { useSnackbar } from 'notistack';
import { withHistory } from 'slate-history';
import { createEditor, Descendant, Transforms } from 'slate';
import React, { useRef, useState, useEffect } from 'react';

// api
import { uploadContentImage } from 'api/content';

// constants
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

//constants
import { initialEditorValue } from 'constants/initialEditorValue';

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
import {
  addImageToEditor,
  clearEditor,
  composeSlateHighOrderFns,
  Element,
  Leaf,
  withImages,
  withLinks,
  withShortcuts,
} from 'utils/slate';

interface Props {
  clearText?: boolean;
  editorProps: any;
  isSubmitting: boolean;
  onChange: (editor: any) => void;
}

const Emoji = (props) => <Picker onSelect={(event) => props.addEmoji(event)} />;

const Editor = ({
  editorProps = {},
  isSubmitting,
  onChange,
  clearText,
}: Props) => {
  const [data, setData] = useState<Array<Descendant>>(initialEditorValue);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editor] = useState(() =>
    composeSlateHighOrderFns(
      withImages,
      withShortcuts,
      withLinks,
      withHistory,
      withReact
    )(createEditor())
  );

  useEffect(() => {
    if (clearText) {
      setData(initialEditorValue);
      clearEditor(editor);
    }
  }, [clearText]);

  const imageRef = useRef(null);
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

  const handleImageUpload = async (event) => {
    try {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append('file', file);

        const data = await uploadContentImage(formData);
        addImageToEditor({
          data,
          editor,
          removeMethod: () => {
            // const position = editor.selection;
            // Transforms.delete(editor, {
            //   at: {
            //     anchor: { path: position.anchor.path, offset: position.anchor.offset },
            //     focus: { path: position.focus.path, offset: position.focus.offset },
            //   },
            // })
          },
        });
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const addEmoji = (emoji) => {
    const emojiElement = {
      type: 'emoji',
      name: emoji?.name,
      emoji: emoji?.native,
      children: [{ text: '' }],
    };

    handleClose();
    Transforms.insertNodes(editor, emojiElement as any);
  };

  const onChangeEditor = (data: any) => {
    setData(data);
    onChange(data);
  };

  return (
    <Box
      borderRadius={16}
      display="flex"
      flexDirection={hasContent() ? 'column' : 'row'}
      padding={0.5}
      style={{ backgroundColor: neutral[50] }}
      width="100%"
    >
      <Slate editor={editor} value={data} onChange={onChangeEditor}>
        <Editable
          spellCheck
          renderElement={(props) => <Element {...props} />}
          renderLeaf={(props) => <Leaf {...props} />}
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
        padding={hasContent() ? 0.5 : 0}
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
          onClose={handleClose}
        >
          <Emoji addEmoji={addEmoji} />
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
          id="upload-image"
          type="file"
          onChange={handleImageUpload}
        />
        <IconButton
          disabled={isSubmitting || !hasContent()}
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
  );
};

export default Editor;
