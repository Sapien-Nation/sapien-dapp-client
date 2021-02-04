import { isValidElement } from 'react';

// types
import type { DialogProps } from '@material-ui/core/Dialog';
import type { Theme } from '@material-ui/core';

// mui
import {
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
  isFetching?: boolean;
  onClose?: () => void;
  onCancel?: (data?: unknown) => void;
  onConfirm?: (event?: unknown) => void;
  showCancel?: boolean;
  showConfirm?: boolean;
  cancelLabel?: string;
  confirmLabel?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
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
  isFetching,
  onClose,
  onCancel = onClose || (() => null),
  onConfirm,
  showCancel = true,
  showConfirm = true,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  title,
  subtitle,
  children,
  actions = (
    <>
      {showCancel && (
        <Button
          disabled={isFetching}
          onClick={onCancel}
          style={{ marginRight: useTheme().spacing(2) }}
        >
          {cancelLabel}
        </Button>
      )}
      {showConfirm && (
        <Button
          color="primary"
          variant="contained"
          disabled={isFetching}
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
      <IconButton className={classes.root} aria-label="close" onClick={onCancel}>
        <CloseIcon />
      </IconButton>
      {isValidElement(title) ? (
        title
      ) : (
        <DialogTitle id="dialog-title">{title}</DialogTitle>
      )}
      {subtitle}
      <DialogContent>{children}</DialogContent>
      <DialogActions disableSpacing>{actions}</DialogActions>
    </MUIDialog>
  );
};

export default Dialog;
