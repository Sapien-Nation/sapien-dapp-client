// constants
import { ElementType } from '../constants';

interface Props {
  attributes: any;
  children: React.ReactElement;
  element: ElementType;
}

const Paragraph = ({ attributes, children, element }: Props) => {
  return <p {...attributes}>{children}</p>;
};

export default Paragraph;
