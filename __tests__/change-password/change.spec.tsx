// api
import { changePassword } from 'api/authentication';

// utils
import {
  mockRouter,
  render,
  screen,
  setLoggedOutUser,
  user,
  waitFor,
} from 'utils/testUtils';

// components
import ChangePasswordPage from 'pages/change-password/change';

// mocks
const push = jest.fn();
jest.mock('api/authentication');

(changePassword as jest.Mock).mockReturnValue(true);

beforeEach(() => {
  setLoggedOutUser();
});

const error = { message: 'Error' };
const getChangePassword = () =>
  screen.getByRole('button', { name: 'Change Password' });

test('should not render page when no token in query', () => {
  render(<ChangePasswordPage />, {
    route: mockRouter({
      query: {},
    }),
  });

  expect(
    screen.queryByRole('heading', {
      name: 'Create your Sapien account',
    })
  ).not.toBeInTheDocument();
});

test('should change password', async () => {
  const token = 'token';
  render(<ChangePasswordPage />, {
    route: mockRouter({
      query: { token },
      push,
    }),
  });

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
  user.type(passwordInputs[1], password);

  // on error
  (changePassword as jest.Mock).mockRejectedValueOnce(error.message);
  user.click(getChangePassword());

  expect(await screen.findByText(error.message)).toBeInTheDocument();
  expect(changePassword).toHaveBeenCalledWith({
    token,
    password,
  });

  // on success
  (changePassword as jest.Mock).mockClear();
  user.click(getChangePassword());

  await waitFor(() => {
    expect(changePassword).toHaveBeenCalledWith({
      token,
      password,
    });
  });

  expect(push).toHaveBeenCalledWith('/change-password/success');
});
