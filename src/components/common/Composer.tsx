import { Editor } from 'draft-js';

// types
import type { EditorProps } from 'draft-js';

interface Props extends EditorProps {
  isInline?: boolean;
}

const Composer = ({ ...rest }: Props) => {
  return <Editor {...rest} />;
};

export default Composer;
