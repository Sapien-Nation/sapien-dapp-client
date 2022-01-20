import { DefaultLeaf } from 'slate-react';
import { tw } from 'twind';

// constants
import { ElementType, LeafType } from '../constants';

// components
import { Embed, Image as ImageElement, Paragraph, Video } from '../elements';

const renderLeaf = (props) => {
  switch (props?.leaf.type) {
    case LeafType.Hashtag:
      return (
        <a {...props.attributes} className={tw`text-indigo-800`}>
          {props.children}
        </a>
      );
    case LeafType.Link:
      return (
        <a {...props.attributes} className={tw`text-indigo-500`}>
          {props.children}
        </a>
      );
    default:
      return <DefaultLeaf {...props} />;
  }
};

const renderElement = (props) => {
  switch (props.element.type) {
    case ElementType.Link:
      return <Embed {...props} />;
    case ElementType.Image:
      return <ImageElement {...props} />;
    case ElementType.Video:
      return <Video {...props} />;
  }
  return <Paragraph {...props} />;
};

const useEditorConfig = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) =>
    element.type === ElementType.Image || isVoid(element);

  editor.insertData = (data) => {
    insertData(data);
  };

  return { renderElement, renderLeaf };
};

export default useEditorConfig;
