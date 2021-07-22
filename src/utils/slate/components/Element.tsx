import { primary } from 'styles/colors';

// components
import { Image } from 'utils/slate/components/Image';
import { VideoElement } from 'utils/slate/components/Video';

// mui
import { Typography } from '@material-ui/core';

export const Element = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'video':
      return <VideoElement {...props} />;
    case 'emoji':
      return (
        <span
          {...attributes}
          aria-label={element.name}
          role="img"
          style={{ display: 'inline' }}
        >
          {element.emoji}
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
        <p style={{ display: 'inline', margin: 2 }} {...attributes}>
          {children}
        </p>
      );
  }
};
