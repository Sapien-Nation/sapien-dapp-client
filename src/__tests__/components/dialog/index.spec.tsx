// utils
import { render, screen, user } from 'utils/tests';

// mui
import { Typography } from '@material-ui/core';

// components
import Dialog from 'components/dialog';

// mocks
const onClose = jest.fn();
const onCancel = jest.fn();
const onConfirm = jest.fn();

const defaultProps = {
  title: 'Dialog',
  open: true,
  onClose,
  onCancel,
  onConfirm,
};

const renderComponent = (props = {}) =>
  render(
    <Dialog {...defaultProps} {...props}>
      <h1>children</h1>
    </Dialog>
  );

test('default', () => {
  renderComponent({ subtitle: <button>Stepper</button> });

  // default
  const cancelButton = screen.getByRole('button', { name: /cancel/i });
  const confirmButton = screen.getByRole('button', { name: /confirm/i });
  const closeButton = screen.getByRole('button', { name: /close/i });
  expect(screen.getByRole('heading', { name: /dialog/i })).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
  expect(confirmButton).toBeInTheDocument();
  expect(closeButton).toBeInTheDocument();

  // children
  expect(
    screen.getByRole('heading', { name: /children/i })
  ).toBeInTheDocument();

  // onClose
  user.click(closeButton);
  expect(onClose).toHaveBeenCalled();

  // onCancel
  user.click(cancelButton);
  expect(onCancel).toHaveBeenCalled();

  // onSubmit
  user.click(confirmButton);
  expect(onConfirm).toHaveBeenCalled();

  // subtitle
  expect(screen.getByRole('button', { name: /stepper/i })).toBeInTheDocument();
});

test('title node', () => {
  renderComponent({ title: <Typography variant="h1">Title</Typography> });

  expect(screen.getByRole('heading', { name: /title/i })).toBeInTheDocument();
});

describe('actions', () => {
  test('visibility', () => {
    renderComponent({ showCancel: false, showConfirm: false });

    expect(
      screen.queryByRole('button', { name: /cancel/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /confirm/i })
    ).not.toBeInTheDocument();
  });

  test('custom actions', () => {
    renderComponent({
      actions: (
        <form aria-label="actions">
          <button>Back</button>
          <button>Next</button>
        </form>
      ),
    });
    expect(screen.getByRole('form', { name: /actions/i })).toBeInTheDocument();
  });
});

test('labels', () => {
  renderComponent({ cancelLabel: 'Cancel', confirmLabel: 'Confirm' });
  expect(screen.getByRole('button', { name: /cancel/i })).toHaveTextContent(
    'Cancel'
  );
  expect(screen.getByRole('button', { name: /confirm/i })).toHaveTextContent(
    'Confirm'
  );
});
