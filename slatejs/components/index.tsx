// components
import Mention from './Mention';

export const Element = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case 'mention':
      return <Mention {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
