// storybook
import { Meta } from '@storybook/react';

// components
import ContentItem from 'components/content/ContentItem';

// types
import { mockContent } from 'tools/mocks/content';

const StoryMeta: Meta = {
  title: 'Content/ContentItem',
  component: ContentItem,
};

export default StoryMeta;

export const ComposerStory = () => {
  return (
    <div>
      <ContentItem content={mockContent()} />
    </div>
  );
};
