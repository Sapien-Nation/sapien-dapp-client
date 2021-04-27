// storybook
import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// components
import Dialog from 'components/dialog';

const StoryMeta: Meta = {
  title: 'Dialog/Default',
  component: Dialog,
};

export default StoryMeta;

export const TestStory = () => (
  <Dialog
    open
    maxWidth="lg"
    title="Story Dialog"
    onCancel={action('onCancel')}
    onClose={action('onClose')}
    onConfirm={action('onConfirm')}
  >
    <h1>Render Dialog Body</h1>
  </Dialog>
);
