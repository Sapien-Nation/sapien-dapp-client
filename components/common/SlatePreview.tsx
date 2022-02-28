import { useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

interface Props {
  preview: Array<Descendant>;
}

function SlatePreview({ preview }: Props) {
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <Slate
      editor={editor}
      value={preview}
      onChange={() => {
        //
      }}
    >
      <Editable readOnly />
    </Slate>
  );
}

export default SlatePreview;
