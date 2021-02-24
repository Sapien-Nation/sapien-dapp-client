import MockAdapter from 'axios-mock-adapter';

// api
import axios from 'api';

// utils
import { render, screen, user, waitFor } from 'utils/tests';

// mocks
import { mockRouter } from 'mocks/routes';

// components
import AuthPage from 'pages/auth';

const push = jest
  .fn()
  .mockImplementation((path: string) => Promise.resolve(path));
const router = mockRouter({ push });

const renderComponent = (options = {}) =>
  render(<AuthPage />, {
    ...options,
  });

test('LoginForm', async () => {
  const mock = new MockAdapter(axios);
  renderComponent({
    router: {
      ...router,
      asPath: '/#login',
    },
  });

  expect(screen.getByRole('heading', { name: /log in/i })).toBeInTheDocument();

  // validation
  user.click(screen.getByRole('button', { name: /log in/i }));

  await waitFor(() => expect(push).not.toHaveBeenCalled());
  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  expect(screen.getByText(/password is required/i)).toBeInTheDocument();

  user.type(
    screen.getByRole('textbox', {
      name: /email, phone number, or username/i,
    }),
    'bugssbunny'
  );
  user.type(screen.getAllByLabelText(/password/i)[0], '123456');
  user.click(
    screen.getByRole('button', { name: /toggle password visibility/i })
  );

  await waitFor(() => {
    expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument();
  });

  // onError
  const error = { message: 'Login Error' };
  mock.onPost('/api/users/login').reply(400, error);
  user.click(screen.getByRole('button', { name: /log in/i }));

  await waitFor(() => {
    expect(push).not.toHaveBeenCalled();
    expect(screen.getByText(error.message)).toBeInTheDocument();
  });

  // onSuccess
  mock.onPost('/api/users/login').reply(200);
  user.click(screen.getByRole('button', { name: /log in/i }));

  await waitFor(() => {
    expect(push).toHaveBeenCalledWith('/');
  });
});
