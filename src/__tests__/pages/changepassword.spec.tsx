// components
import ChangePasswordPage from 'pages/forgot-password/change';

// utils
import { render, screen, user, waitFor } from 'utils/testUtils';

// mock data
const error = 'Error';
const password = '123456';
const token = '';
const changePassword = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

const getSendButton = () =>
  screen.getByRole('button', { name: 'Send request' });

const renderComponent = () =>
  render(<ChangePasswordPage />, { user: { changePassword } });

test('renders correctly', async () => {
  renderComponent();

  expect(
    screen.getByRole('heading', { name: 'Create New Password' })
  ).toBeInTheDocument();

  const confirmPasswordField = screen.getByLabelText(/Confirm password/);
  user.type(screen.getByLabelText(/Password/), password);
  user.type(confirmPasswordField, '12345');

  // not match error
  user.click(getSendButton());
  await waitFor(() => {
    expect(changePassword).not.toHaveBeenCalledWith();
    expect(screen.getByText(/Password dont match/i)).toBeInTheDocument();
  });

  // onError
  changePassword.mockRejectedValueOnce(error);
  user.clear(confirmPasswordField);
  user.type(confirmPasswordField, password);
  user.click(getSendButton());

  await waitFor(() => {
    expect(changePassword).toHaveBeenCalledWith({
      password,
      token,
    });
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  // onSuccess
  jest.clearAllMocks();
  user.click(getSendButton());
  await waitFor(() => {
    expect(changePassword).toHaveBeenCalledWith({
      password,
      token,
    });
  });

  expect(screen.getByText('Password Change successfully')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
});
