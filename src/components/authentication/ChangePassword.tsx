import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

// api
import { changePassword as changePasswordAction } from 'api/authentication';

// components
import { PasswordField } from 'components/common';

// mui
import { Box, Button, Tooltip } from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';

interface Props {
  changeView: () => void;
  token: string;
}

const ChangePassword = ({ changeView, token }: Props) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async ({ password }: { password: string }) => {
    try {
      await changePasswordAction({ password, token });
      changeView();
    } catch (error) {
      enqueueSnackbar(error, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    }
  };

  return (
    <form id="change-password-form" onSubmit={handleSubmit(onSubmit)}>
      <PasswordField
        errors={errors}
        label={
          <Box alignItems="center" display="flex">
            Password{' '}
            <Tooltip
              arrow
              color="primary"
              placement="right"
              title={
                <Box borderRadius={10} minWidth={321} padding={1.6}>
                  Minimum length is 8 characters. Must include at least 1 alpha,
                  1 numeric, 1 lowercaps, and 1 highercaps.
                </Box>
              }
            >
              <InfoIcon fontSize="small" style={{ marginLeft: '0.5rem' }} />
            </Tooltip>
          </Box>
        }
        placeholder="New Password"
        register={register}
      />
      <PasswordField
        isConfirm
        errors={errors}
        label="Confirm password"
        name="confirmPassword"
        placeholder="Password"
        register={register}
        watch={watch}
      />

      <Button
        fullWidth
        aria-label="Send change password request"
        color="primary"
        disabled={isSubmitting}
        type="submit"
        variant="contained"
      >
        Send request
      </Button>
    </form>
  );
};

export default ChangePassword;
