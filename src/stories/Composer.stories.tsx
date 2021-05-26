// storybook
import { Meta } from '@storybook/react';

// context
import { EditorProvider, useEditor } from 'context/editor';

// components
import { Composer } from 'components/common';

const StoryMeta: Meta = {
  title: 'Composer/Post',
  component: Composer,
};

export default StoryMeta;

export const ComposerStory = () => {
  const { editorState, setEditorState } = useEditor();
  return (
    <Composer
      editorState={editorState}
      placeholder="What’s on your mind, Jonathan?"
      onChange={setEditorState}
    />
  );
};

ComposerStory.decorators = [
  (Story, rest) => (
    <EditorProvider>
      <Story {...rest} />
    </EditorProvider>
  ),
];
