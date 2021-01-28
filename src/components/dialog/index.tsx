import { isValidElement } from 'react';

// types
import type { DialogProps } from '@material-ui/core/Dialog';

// mui
import {
  Box,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Dialog as MUIDialog
} from '@material-ui/core';

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
}) => (
  // TODO add close icon
  <MUIDialog aria-labelledby="dialog-title" {...rest}>
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

export default Dialog;
