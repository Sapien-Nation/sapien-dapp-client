import { DefaultLeaf } from 'slate-react';

// constants
import { ElementType } from '../constants';

// components
import { Image as ImageElement, Link, Paragraph, Video } from '../elements';
import { insertLink } from '../utils';

const renderLeaf = (props) => {
  return <DefaultLeaf {...props} />;
};

const renderElement = (props) => {
  switch (props.element.type) {
    case ElementType.Image:
      return <ImageElement {...props} />;
    case ElementType.Video:
      return <Video {...props} />;
    case ElementType.Link:
      return <Link {...props} />;
  }
  return <Paragraph {...props} />;
};

const useEditorConfig = (editor) => {
  const { insertData, insertText, isInline, isVoid } = editor;

  editor.isInline = (element) =>
    element.type === ElementType.Link || isInline(element);

  editor.isVoid = (element) =>
    element.type === ElementType.Image || isVoid(element);

  editor.insertData = (data) => {
    if (data) {
      const text = data.getData('text/plain');

      if (text) {
        try {
          const url = new URL(text);
          insertLink(editor, url.href);
        } catch (err) {
          insertData(text);
        }
      }
    }
  };

  editor.insertText = (text) => {
    if (text) {
      try {
        const url = new URL(text);
        insertLink(editor, url.href);
      } catch (err) {
        insertText(text);
      }
    }
  };

  return { renderElement, renderLeaf };
};

export default useEditorConfig;
