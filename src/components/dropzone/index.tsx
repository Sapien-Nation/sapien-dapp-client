import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

// types
import type { DropzoneProps } from 'react-dropzone';

interface Props extends DropzoneProps {
  handleDrop: (files: Array<File>) => void;
  renderElement: (isDragActive: boolean) => React.ReactElement;
}

const Dropzone: React.FC<Props> = ({ handleDrop, renderElement, ...rest }) => {
  const onDrop = useCallback(handleDrop, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...rest
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {renderElement(isDragActive)}
    </div>
  );
};

export default Dropzone;
