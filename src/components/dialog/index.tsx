import { isValidElement } from 'react';

// types
import type { DialogProps } from '@material-ui/core/Dialog';

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

const useStyles = makeStyles(() => ({
  root: () => ({
    top: '1rem',
    right: '1rem',
    color: '#ccc',
    cursor: 'pointer',
    padding: 0,
    position: 'absolute'
  })
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
        <Button disabled={isFetching} onClick={onCancel}>
          {cancelLabel}
        </Button>
      )}
      {showConfirm && (
        <Button disabled={isFetching} onClick={onConfirm}>
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
      <DialogContent>
        <Box>{children}</Box>
      </DialogContent>
      <DialogActions>
        <Box>{actions}</Box>
      </DialogActions>
    </MUIDialog>
  );
};

export default Dialog;
