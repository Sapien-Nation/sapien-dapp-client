// api
import { changePassword, login } from 'api/authentication';
import { useRouter } from 'next/router';

// utils
import { render, screen, user, mockRouter, waitFor } from 'utils/testUtils';

// components
import ChangePasswordPage from 'pages/change-password/change';

// mocks
jest.mock('api/authentication');

const push = jest.fn();
const router = mockRouter({
  push,
  query: {
    token: 'ce50ee38a7154e7e66382349bd9b15',
  },
});

beforeEach(() => {
  jest.clearAllMocks();
});

const error = { message: 'Error' };
const getResetButton = () =>
  screen.getByRole('button', { name: 'Change Password' });

test('can change password', async () => {
  render(<ChangePasswordPage />, { route: router });

  expect(screen.getByRole('img', { name: 'auth-image' })).toHaveAttribute(
    'src',
    'https://d1bdmh0gdusw0k.cloudfront.net/images/misc/asset2.jpeg'
  );
  expect(screen.getByRole('img', { name: 'sapien' })).toHaveAttribute(
    'src',
    '/images/logooutlined.svg'
  );

  expect(
    screen.getByRole('heading', {
      name: 'Change Password',
    })
  ).toBeInTheDocument();

  const password = 'Sapien123456';

  const passwordInputs = screen.getAllByLabelText(/Password/i);
  user.type(passwordInputs[0], password);
  user.type(passwordInputs[1], `${password}r`);

  // on password dont match
  user.click(getResetButton());

  const matchErrors = await screen.findAllByText(/Passwords must match/i);
  expect(matchErrors.length).toBe(2);
  expect(changePassword).not.toHaveBeenCalled();

  // on api error
  user.clear(passwordInputs[1]);
  user.type(passwordInputs[1], password);

  (changePassword as jest.Mock).mockRejectedValueOnce(error.message);
  user.click(getResetButton());

  expect(await screen.findByText(error.message)).toBeInTheDocument();
  expect(changePassword).toHaveBeenCalledWith({
    client: 'user-agent-test',
    redirect: '/',
    password,
  });

  // on success
  (changePassword as jest.Mock).mockClear();
  user.click(getResetButton());

  await waitFor(() => {
    expect(changePassword).toHaveBeenCalledWith({
      client: 'user-agent-test',
      redirect: '/',
      password,
    });
  });

  expect(push).toHaveBeenCalledWith('/');
});
