import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

// types
import type { DropzoneProps, DropzoneOptions } from 'react-dropzone';

// mui
import { Box } from '@material-ui/core';

// styles
import { gray1, gray2 } from 'styles/colors';

interface Props extends Omit<DropzoneProps, 'children'> {
  children: React.ReactElement | Array<React.ReactElement>;
  className?: string;
  id: string;
  onChange: (droppedFiles: Array<File>) => void;
}

const Dropzone = ({ children, className, id, onChange, ...rest }: Props) => {
  const onDrop = useCallback<DropzoneOptions['onDrop']>(
    (droppedFiles) => {
      onChange(droppedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    ...rest,
  });

  return (
    <Box
      alignItems="center"
      borderRadius={4}
      className={className}
      display="flex"
      height="100%"
      justifyContent="center"
      overflow="hidden"
      position="relative"
      style={{
        backgroundColor: gray2,
        border: `1px dashed ${gray1}`,
      }}
      width="100%"
      {...getRootProps()}
    >
      {children}
      <input {...getInputProps()} id={id} />
    </Box>
  );
};

export default Dropzone;
