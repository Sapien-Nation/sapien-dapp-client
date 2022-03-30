import { useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

// hooks
import { useEditorConfig } from '../hooks';

interface Props {
  preview: Array<Descendant>;
}

function SlatePreview({ preview }: Props) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderElement } = useEditorConfig(editor);

  return (
    <Slate
      editor={editor}
      value={preview}
      onChange={() => {
        //
      }}
    >
      <Editable readOnly renderElement={renderElement} />
    </Slate>
  );
}

export default SlatePreview;
