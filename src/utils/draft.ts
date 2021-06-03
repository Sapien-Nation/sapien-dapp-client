import { EditorState, Modifier } from 'draft-js';

// types
import type { EditorState as EditorStateType } from 'draft-js';
import type { Emoji } from 'types/draft';

export enum Entities {
  Emoji = 'EMOJI',
}

export const emojiStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'EMOJI'
    );
  }, callback);
};

export const addEmoji = (editorState: EditorStateType, emoji: Emoji) => {
  const contentState = editorState.getCurrentContent();
  const currentSelectionState = editorState.getSelection();

  const contentStateWithEntity = contentState.createEntity(
    Entities.Emoji,
    'MUTABLE',
    emoji
  );

  let emojiAddedContent;
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const afterRemovalContentState = Modifier.removeRange(
    contentState,
    currentSelectionState,
    'backward'
  );
  const targetSelection = afterRemovalContentState.getSelectionAfter();
  emojiAddedContent = Modifier.insertText(
    afterRemovalContentState,
    targetSelection,
    emoji.unified,
    undefined,
    entityKey
  );

  const emojiEndPos = targetSelection.getAnchorOffset();
  const blockKey = targetSelection.getAnchorKey();
  const blockSize = contentState.getBlockForKey(blockKey).getLength();

  // If the emoji is inserted at the end, a space is appended right after for
  // a smooth writing experience.
  if (emojiEndPos === blockSize) {
    emojiAddedContent = Modifier.insertText(
      emojiAddedContent,
      emojiAddedContent.getSelectionAfter(),
      ' '
    );
  }

  const newEditorState = EditorState.push(
    editorState,
    emojiAddedContent,
    'insert-fragment'
  );
  return EditorState.forceSelection(
    newEditorState,
    emojiAddedContent.getSelectionAfter()
  );
};
