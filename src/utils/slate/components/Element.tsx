import { primary } from 'styles/colors';

// components
import { Image } from 'utils/slate/components/Image';

// mui
import { Typography } from '@material-ui/core';

export const Element = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
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
