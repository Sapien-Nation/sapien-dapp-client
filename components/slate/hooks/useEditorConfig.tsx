import { Transforms } from 'slate';
import { DefaultLeaf } from 'slate-react';

// constants
import { ElementType } from '../constants';

// components
import { Image as ImageElement, Paragraph, Video } from '../elements';

const renderLeaf = (props) => {
  return <DefaultLeaf {...props} />;
};

const renderElement = (props) => {
  switch (props.element.type) {
    case ElementType.Image:
      return <ImageElement {...props} />;
    case ElementType.Video:
      return <Video {...props} />;
  }
  return <Paragraph {...props} />;
};

const useEditorConfig = (editor) => {
  const { isVoid } = editor;

  editor.isVoid = (element) =>
    element.type === ElementType.Image || isVoid(element);

  return { renderElement, renderLeaf };
};

export default useEditorConfig;
