// api
import { changePassword } from 'api/authentication';

// components
import ChangePasswordPage from 'pages/change-password/change';

// utils
import { render, screen, user, waitFor } from 'utils/testUtils';

// mock data
jest.mock('api/authentication');

(changePassword as jest.Mock).mockResolvedValue(true);

const error = 'Error';
const password = '123456';
const token = '';

beforeEach(() => {
  jest.clearAllMocks();
});

const getSendButton = () =>
  screen.getByRole('button', { name: 'Send request' });

const renderComponent = () => render(<ChangePasswordPage />);

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
  (changePassword as jest.Mock).mockRejectedValueOnce(error);
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
