import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { ErrorMessage } from '@hookform/error-message';

// components
import { Dialog, ChartCount } from 'components/common';

// utils
import { SquareNameRegex } from 'utils/regex';

// mui
import { Box, TextField } from '@material-ui/core';

// types
import type { Tribe } from 'tools/types/tribeBar';

interface Props {
  squareID: string;
  onClose: () => void;
}

const form = 'create-square-form';

const CreateSquare = ({ squareID, onClose }: Props) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm();
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async () => {
    try {
      const response = { id: '1' };
      mutate(
        '/api/v3/profile/tribes',
        (tribes: Array<Tribe>) => {
          return tribes.map((tribe) => ({
            ...tribe,
            squares:
              tribe.mainSquareId === squareID
                ? [...tribe.squares, response]
                : tribe.squares,
          }));
        },
        false
      );

      onClose();
      enqueueSnackbar('Square Created Successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });

      push(`/client/${squareID}/square/${response.id}`);
    } catch ({ error }) {
      enqueueSnackbar(error, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
  };

  return (
    <Dialog
      open
      confirmDisabled={isSubmitting}
      form={form}
      isFetching={isSubmitting}
      maxWidth="sm"
      title="New Square"
      onClose={onClose}
    >
      <form id={form} onSubmit={handleSubmit(handleFormSubmit)}>
        <TextField
          fullWidth
          error={Boolean(errors.name)}
          helperText={
            <Box
              component="span"
              display="block"
              marginTop={0.5}
              textAlign="right"
            >
              <ErrorMessage errors={errors} name="name" />
            </Box>
          }
          inputProps={{
            ...register('name', {
              pattern: {
                value: SquareNameRegex,
                message: 'Invalid tribe name',
              },
              required: {
                value: true,
                message: 'Name is required',
              },
              maxLength: {
                value: 40,
                message: 'Name is too long',
              },
            }),
            autoComplete: 'name',
          }}
          label={
            <Box display="flex" justifyContent="space-between">
              Name
              <ChartCount control={control} maxCount={40} name="name" />
            </Box>
          }
          placeholder="Foodies"
        />
      </form>
    </Dialog>
  );
};

export default CreateSquare;
