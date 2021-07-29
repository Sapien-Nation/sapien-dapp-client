// storybook
import { Meta } from '@storybook/react';

// components
import CreateContentForm from 'components/content/CreateContentForm';

// mocks
import { mockUser } from 'tools/mocks/user';

const user = mockUser();
const StoryMeta: Meta = {
  title: 'Content/CreateContentForm',
  component: CreateContentForm,
};

export default StoryMeta;

export const ComposerStory = () => {
  return (
    <div>
      <CreateContentForm
        setIsCreating={() => {}}
        squareID="1"
        user={user}
        onSave={() => {}}
      />
    </div>
  );
};
