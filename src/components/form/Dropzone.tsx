import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

// types
import type { DropzoneProps, DropzoneOptions } from 'react-dropzone';

// mui
import { Box, IconButton } from '@material-ui/core';
import { CloseOutlined as CloseIcon } from '@material-ui/icons';

interface Props extends DropzoneProps {
  className?: string;
  name: string;
  render: (isDragActive: boolean) => React.ReactElement;
}

const Dropzone = ({ className, name, render, ...rest }: Props) => {
  const { register, unregister, setValue, watch } = useFormContext();
  const onDrop = useCallback<DropzoneOptions['onDrop']>(
    (droppedFiles) => {
      setValue(name, droppedFiles, { shouldValidate: true });
    },
    [setValue, name]
  );

  const files: File[] = watch(name);

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
    <>
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
      {Array.isArray(files) &&
        files?.map((file) => (
          <div key={file.name}>
            <IconButton
              color="primary"
              style={{
                position: 'absolute',
                marginLeft: '35px',
                marginTop: '-20px'
              }}
              onClick={() => setValue(name, null)}
            >
              <CloseIcon />
            </IconButton>
            <img
              alt={`${name} preview`}
              height={55}
              src={URL.createObjectURL(file)}
              style={{ borderRadius: 15 }}
              width={55}
            />
          </div>
        ))}
    </>
  );
};

export default Dropzone;
