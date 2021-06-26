import { primary } from 'styles/colors';

export const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'link':
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      );
    case 'block-quote':
      return (
        <blockquote
          {...attributes}
          style={{
            fontStyle: 'italic',
            borderLeft: `4px solid ${primary}`,
          }}
        >
          <span style={{ marginLeft: 20 }}>{children}</span>
        </blockquote>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};
