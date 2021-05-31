// storybook
import { Meta } from '@storybook/react';

// components
import CreatePostForm from 'components/post/CreatePostForm';

import 'draft-js/dist/Draft.css';

const StoryMeta: Meta = {
  title: 'Post/CreatePostForm',
  component: CreatePostForm,
};

export default StoryMeta;

export const ComposerStory = () => {
  // TODO use mocks
  return (
    <div style={{ backgroundColor: '#F9F9FA', padding: 15 }}>
      <CreatePostForm
        user={{ avatar: 'https://i.pravatar.cc/300', username: 'Jhon Doe' }}
      />
    </div>
  );
};
