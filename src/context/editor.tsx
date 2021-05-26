import { EditorState } from 'draft-js';
import { createContext, useContext, useState } from 'react';

// types
import type { EditorState as EditorStateType } from 'draft-js';

interface Props {
  children: React.ReactNode;
}

interface EditorStateContext {
  editorState: EditorStateType;
  setEditorState: (editorState: EditorState) => void;
}

export const EditorContext = createContext<EditorStateContext | null>(null);

const EditorProvider = ({ children }: Props) => {
  const [editorState, setEditorState] = useState<EditorStateType>(
    EditorState.createEmpty()
  );

  return (
    <EditorContext.Provider value={{ editorState, setEditorState }}>
      {children}
    </EditorContext.Provider>
  );
};

function useEditor() {
  const context = useContext(EditorContext);

  if (context === undefined) {
    throw new Error('useMe must be used within a EditorProvider');
  }
  return context;
}

export { EditorProvider, useEditor };
