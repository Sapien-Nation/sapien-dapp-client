// components
import { Image, Video } from 'components/common/fields/Slate';

// mui
import { Typography } from '@material-ui/core';

// styles
import { primary } from 'styles/colors';

const renderLeaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const renderElement = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'video':
      return <Video {...props} />;
    case 'emoji':
      return (
        <span {...attributes} aria-label={children} role="img">
          {children}
          <span style={{ display: 'none' }}>{children}</span>
        </span>
      );
    case 'heading':
      return (
        <Typography variant="h1" {...attributes}>
          {children}
        </Typography>
      );
    case 'link':
      return (
        <a
          {...attributes}
          href={element.url}
          style={{
            color: primary[800],
          }}
        >
          {children}
        </a>
      );
    case 'block-quote':
      return (
        <blockquote
          {...attributes}
          style={{
            fontStyle: 'italic',
            borderLeft: `4px solid ${primary[800]}`,
          }}
        >
          <span style={{ marginLeft: 20 }}>{children}</span>
        </blockquote>
      );
    case 'image':
      return <Image {...props} />;
    default:
      return (
        <p style={{ margin: 2 }} {...attributes}>
          {children}
        </p>
      );
  }
};

const EditorInlines = ['emoji', 'link'];

const useEditorConfig = (editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) => {
    return ['image'].includes(element.type) || isVoid(element);
  };

  editor.isInline = (element) => {
    return EditorInlines.includes(element.type);
  };

  return { renderElement, renderLeaf };
};

export default useEditorConfig;
