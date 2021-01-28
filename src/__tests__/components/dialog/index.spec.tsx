// utils
import { render, screen, user } from 'utils/testUtils';

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
  onConfirm
};

const renderComponent = (props = {}) =>
  render(
    <Dialog {...defaultProps} {...props}>
      <h1>children</h1>
    </Dialog>
  );

test('default', () => {
  const { rerender } = renderComponent({ subtitle: <button>Stepper</button> });

  // default
  const cancelButton = screen.getByRole('button', { name: /cancel/i });
  const confirmButton = screen.getByRole('button', { name: /confirm/i });
  expect(screen.getByRole('heading', { name: /dialog/i })).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
  expect(confirmButton).toBeInTheDocument();

  // children
  expect(screen.getByRole('heading', { name: /children/i })).toBeInTheDocument();

  // onCancel
  user.click(cancelButton);
  expect(onCancel).toHaveBeenCalled();

  // onSubmit
  user.click(confirmButton);
  expect(onConfirm).toHaveBeenCalled();

  //TODO test for onClose

  // subtitle
  expect(screen.getByRole('button', { name: /stepper/i })).toBeInTheDocument();

  // isFetching
  rerender(
    <Dialog {...defaultProps} isFetching>
      <h1>children</h1>
    </Dialog>
  );

  expect(cancelButton).toBeDisabled();
  expect(confirmButton).toBeDisabled();
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

  // TODO
  // custom actions: renderComponent({ actions: <button>Click</button> });
  // labels:
});
