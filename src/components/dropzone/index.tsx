import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

// types
import type { DropzoneProps } from 'react-dropzone';

// mui
import { Box } from '@material-ui/core';

interface Props extends DropzoneProps {
  className?: string;
  handleDrop: (files: Array<File>) => void;
  renderElement: (isDragActive: boolean) => React.ReactElement;
}

const Dropzone: React.FC<Props> = ({
  className,
  handleDrop,
  renderElement,
  ...rest
}) => {
  const onDrop = useCallback(handleDrop, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...rest
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={className}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {renderElement(isDragActive)}
    </Box>
  );
};

export default Dropzone;
