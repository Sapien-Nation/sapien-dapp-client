import { Editable, Slate, withReact } from 'slate-react';
import { useSnackbar } from 'notistack';
import { withHistory } from 'slate-history';
import { createEditor, Descendant, Transforms } from 'slate';
import React, { useRef, useState, useEffect } from 'react';

// mui
import { Box, IconButton } from '@material-ui/core';
import { ImageOutlined, Send } from '@material-ui/icons';

// styles
import { neutral, primary } from 'styles/colors';

// utils
import {
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

const initialEditorValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const Editor = ({
  editorProps = {},
  isSubmitting,
  onChange,
  clearText,
}: Props) => {
  const [data, setData] = useState<Array<Descendant>>(initialEditorValue);
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

  const removeImage = () => {
    //TODO remove image from API
    // return editor
  };

  const handleUploadImage = async (event: any) => {
    try {
      setTimeout(() => {
        if (event.target.files && event.target.files.length > 0) {
          const file = event.target.files[0];
          const newFile = Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
          const url = newFile.preview;

          const image = {
            type: 'image',
            url,
            children: [{ text: '' }],
            removeMethod: removeImage,
          };
          Transforms.insertNodes(editor, image);

          enqueueSnackbar('Image added successfully', {
            variant: 'success',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
          });

          return editor;
        }
      }, 2000);
    } catch (error) {
      enqueueSnackbar(error, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
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
          onChange={handleUploadImage}
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
