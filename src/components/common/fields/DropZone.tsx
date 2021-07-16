import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

// types
import type { DropzoneProps, DropzoneOptions } from 'react-dropzone';

// mui
import { Box } from '@material-ui/core';

// styles
import { neutral } from 'styles/colors';

//utils
import { MaxSizeHelper } from 'utils/dropzone';

interface Props extends Omit<DropzoneProps, 'children'> {
  children: React.ReactElement | Array<React.ReactElement>;
  className?: string;
  disabledDropzone?: boolean;
  height: string;
  width: string;
  id: string;
  onChange: (droppedFiles: Array<File>) => void;
}

const Dropzone = ({
  children,
  className,
  disabledDropzone = false,
  id,
  height,
  width,
  maxSize,
  onChange,
  ...rest
}: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const onDrop = useCallback<DropzoneOptions['onDrop']>(
    (droppedFiles) => {
      onChange(droppedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    disabled: disabledDropzone,
    onDrop,
    onDropRejected: (files = []) => {
      files.forEach(({ errors = [] }) => {
        errors.forEach(({ message = 'Please select a correct image!' }) => {
          enqueueSnackbar(message, {
            variant: 'warning',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
          });
        });
      });
    },
    maxSize,
    ...rest,
  });

  return (
    <>
      <Box
        alignItems="center"
        borderRadius={4}
        className={className}
        display="flex"
        height={height}
        justifyContent="center"
        overflow="hidden"
        position="relative"
        style={{
          backgroundColor: neutral[50],
          border: `1px dashed ${neutral[400]}`,
        }}
        width={width}
        {...getRootProps()}
      >
        {children}
        <input
          {...getInputProps()}
          data-testid="dropzone-file-uploader"
          id={id}
        />
      </Box>

      <MaxSizeHelper open={open} size={maxSize} />
    </>
  );
};

export default Dropzone;
