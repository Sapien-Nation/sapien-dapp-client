// storybook
import { Meta } from '@storybook/react';

// components
import CreateContentForm from 'components/content/CreateContentForm';

import 'draft-js/dist/Draft.css';

const StoryMeta: Meta = {
  title: 'Content/CreateContentForm',
  component: CreateContentForm,
};

export default StoryMeta;

export const ComposerStory = () => {
  // TODO use mocks
  return (
    <div>
      <CreateContentForm
        user={{ avatar: 'https://i.pravatar.cc/300', username: 'Jhon Doe' }}
      />
    </div>
  );
};
