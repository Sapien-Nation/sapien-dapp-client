import { ContentItem } from 'components/content';

// types
import type { Content } from 'tools/types/content';

interface Props {
  content: Content;
  mutate: () => void;
}

const ContentDetail = ({ content, mutate }: Props) => {
  return <ContentItem content={content} mutate={mutate} variant="detail" />;
};

export default ContentDetail;
