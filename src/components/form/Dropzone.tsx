import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { ErrorMessage } from '@hookform/error-message';

// types
import type { DropzoneProps, DropzoneOptions } from 'react-dropzone';
import type {
  RegisterOptions,
  FieldErrors,
  FieldValues,
} from 'react-hook-form';

// mui
import { Box, IconButton, Typography } from '@material-ui/core';
import { CloseOutlined as CloseIcon } from '@material-ui/icons';

// styles
import { error, red } from 'styles/colors';

interface Props extends DropzoneProps, FieldValues {
  className?: string;
  errors: FieldErrors;
  name: string;
  render: (isDragActive: boolean) => React.ReactElement;
  rules?: RegisterOptions;
}

const Dropzone = ({
  className,
  name,
  render,
  errors,
  rules,
  maxFiles,
  register,
  unregister,
  setValue,
  watch,
  ...rest
}: Props) => {
  const onDrop = useCallback<DropzoneOptions['onDrop']>(
    (droppedFiles) => {
      setValue(name, droppedFiles, { shouldValidate: true });
    },
    [setValue, name]
  );
  const isMultiple = maxFiles > 1;

  const files: File[] = watch(name);

  useEffect(() => {
    register(name, rules);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...rest,
  });

  return (
    <>
      <Box
        alignItems="center"
        className={className}
        display="flex"
        justifyContent="center"
        style={{
          backgroundColor: Object.keys(errors[name] || []).length
            ? error
            : null,
          borderColor: Object.keys(errors[name] || []).length ? red : null,
        }}
        {...getRootProps()}
      >
        {!isMultiple && files && (
          <img
            alt={`${name}`}
            src={
              typeof files === 'string'
                ? String(files)
                : URL.createObjectURL(files[0])
            }
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
            }}
          />
        )}

        <input {...getInputProps()} id={name} />
        {render(isDragActive)}
      </Box>
      <Box alignItems="center" display="flex" justifyContent="flex-start">
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <Typography
              color="secondary"
              role="alert"
              style={{
                textAlign: 'right',
              }}
              variant="subtitle1"
            >
              {message}
            </Typography>
          )}
        />
      </Box>
      {Array.isArray(files) &&
        isMultiple &&
        files?.map((file) => (
          <div key={file.name}>
            <IconButton
              color="primary"
              style={{
                position: 'absolute',
                marginLeft: '35px',
                marginTop: '-20px',
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
