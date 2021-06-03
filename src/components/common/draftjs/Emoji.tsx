import type { ContentState } from 'draft-js';
import type { Emoji } from 'types/draft';

interface Props {
  contentState: ContentState;
  decoratedText: string;
  entityKey: string;
}

const EmojiComponent = ({ contentState, decoratedText, entityKey }: Props) => {
  const data: Emoji = contentState.getEntity(entityKey).getData();
  return (
    <span
      aria-hidden={decoratedText ? 'false' : 'true'}
      aria-label={decoratedText || ''}
      className="emoji"
      role="img"
    >
      {data.emoji}
    </span>
  );
};

export default EmojiComponent;
