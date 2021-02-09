import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

// types
import type { DropzoneProps, DropzoneOptions } from 'react-dropzone';

// mui
import { Box } from '@material-ui/core';

interface Props extends DropzoneProps {
  className?: string;
  name: string;
  render: (isDragActive: boolean) => React.ReactElement;
}

const Dropzone: React.FC<Props> = ({ className, name, render, ...rest }) => {
  const { register, unregister, setValue, watch } = useFormContext();
  const onDrop = useCallback<DropzoneOptions['onDrop']>(
    (droppedFiles) => {
      setValue(name, droppedFiles, { shouldValidate: true });
    },
    [setValue, name]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const files = watch(name); // TODO preview this image, use files.map, supposed it can display 1...n

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...rest
  });

  return (
    <Box
      alignItems="center"
      className={className}
      display="flex"
      justifyContent="center"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {render(isDragActive)}
    </Box>
  );
};

export default Dropzone;
