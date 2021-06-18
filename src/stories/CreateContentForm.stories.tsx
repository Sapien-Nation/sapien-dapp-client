// storybook
import { Meta } from '@storybook/react';

// components
import CreateContentForm from 'components/content/CreateContentForm';

// mocks
import { mockUser } from 'tools/mocks/user';

import 'draft-js/dist/Draft.css';

const user = mockUser();
const StoryMeta: Meta = {
  title: 'Content/CreateContentForm',
  component: CreateContentForm,
};

export default StoryMeta;

export const ComposerStory = () => {
  // TODO use mocks
  return (
    <div>
      <CreateContentForm user={user} />
    </div>
  );
};
