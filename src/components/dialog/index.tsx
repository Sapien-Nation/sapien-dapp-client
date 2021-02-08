import { isValidElement } from 'react';

// types
import type { DialogProps } from '@material-ui/core/Dialog';
import type { Theme } from '@material-ui/core';

// mui
import {
  Box,
  Button,
  makeStyles,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  Dialog as MUIDialog
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

interface Props extends Omit<DialogProps, 'title'> {
  actions?: React.ReactNode;
  form?: string;
  isFetching?: boolean;
  onClose?: () => void;
  onCancel?: (data?: unknown) => void;
  onConfirm?: (event?: unknown) => void;
  cancelLabel?: string;
  confirmLabel?: string;
  showCancel?: boolean;
  showConfirm?: boolean;
  subtitle?: string | React.ReactNode;
  title: string | React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: () => ({
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: '#ccc',
    cursor: 'pointer',
    padding: 0,
    position: 'absolute'
  }),
  marginRight: {
    marginRight: theme.spacing(1.6)
  }
}));

const Dialog: React.FC<Props> = ({
  form,
  isFetching,
  onClose,
  onCancel = onClose || (() => null),
  onConfirm,
  showCancel = true,
  showConfirm = true,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  children,
  title,
  subtitle,
  actions = (
    <>
      {showCancel && (
        <Button
          disabled={isFetching}
          style={{ marginRight: useTheme().spacing(2) }}
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
      )}
      {showConfirm && (
        <Button
          color="primary"
          disabled={isFetching}
          form={form}
          type={form ? 'submit' : 'button'}
          variant="contained"
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      )}
    </>
  ),
  ...rest
}) => {
  const classes = useStyles();
  return (
    <MUIDialog aria-labelledby="dialog-title" {...rest}>
      <IconButton aria-label="close" className={classes.root} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        id="dialog-title"
        justifyContent="space-between"
        paddingBottom={2.5}
        paddingTop={5}
        paddingX={5}
      >
        {isValidElement(title) ? (
          title
        ) : (
          <DialogTitle id="dialog-title">{title}</DialogTitle>
        )}
      </Box>
      {subtitle}
      <DialogContent>{children}</DialogContent>
      <DialogActions disableSpacing>{actions}</DialogActions>
    </MUIDialog>
  );
};

export default Dialog;
