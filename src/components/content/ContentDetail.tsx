// types
import type { Content } from 'tools/types/content';

interface Props {
  content: Content;
}

const ContentDetail = ({ content }: Props) => {
  return <span>{content.id}</span>;
};

export default ContentDetail;
