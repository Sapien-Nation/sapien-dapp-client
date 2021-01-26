// core
import React, { FC } from 'react';

// mui
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import MUIDialog, { DialogProps } from '@material-ui/core/Dialog';
import { Box, Typography } from '@material-ui/core';

export interface Props extends Omit<DialogProps, 'title'> {
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

const Dialog: FC<Props> = ({
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
  children = null,
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
  return (
    <MUIDialog aria-labelledby="dialog-title" {...rest}>
      {typeof title === 'string' ? (
        <DialogTitle id="dialog-title">{title}</DialogTitle>
      ) : (
        title
      )}
      {subtitle && (
        <Box>
          <Typography>{subtitle}</Typography>
        </Box>
      )}
      {children}
      {actions}
    </MUIDialog>
  );
};

export default Dialog;
