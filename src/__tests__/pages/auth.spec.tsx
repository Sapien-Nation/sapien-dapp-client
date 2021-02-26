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

beforeEach(() => {
  jest.clearAllMocks();
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

test('Signup Form', async () => {
  const mock = new MockAdapter(axios);
  renderComponent({
    router: {
      ...router,
      asPath: '/#signup',
    },
  });

  expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
  expect(screen.getByText(/log in/i)).toHaveAttribute('href', '/auth#login');

  user.click(screen.getByRole('button', { name: /sign up/i }));

  await waitFor(() => expect(push).not.toHaveBeenCalled());

  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  expect(screen.getByText(/username is required/i)).toBeInTheDocument();
  expect(screen.getByText('Name is required')).toBeInTheDocument();
  expect(screen.getByText(/password is required/i)).toBeInTheDocument();

  // info onChange
  await waitFor(() => {
    user.type(
      screen.getByRole('textbox', { name: /email/i }),
      'luckasduck@looneytoones.com'
    );
    user.type(screen.getByRole('textbox', { name: /username/i }), 'luckasduck');
    user.type(screen.getByRole('textbox', { name: 'Name' }), 'Lucas Duck');
  });

  expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument();
  expect(screen.queryByText('Name is required')).not.toBeInTheDocument();

  // password

  // Low Password
  await waitFor(() => user.type(screen.getByLabelText('Password'), 'pwd'));
  expect(screen.getByText(/keep going/i)).toBeInTheDocument();

  // Medium Password
  await waitFor(() => user.type(screen.getByLabelText('Password'), 'pwd@'));
  expect(screen.getByText(/almost/i)).toBeInTheDocument();

  // Medium-hight Password
  await waitFor(() => user.type(screen.getByLabelText('Password'), 'pwd@E'));
  expect(screen.getByText(/going well/i)).toBeInTheDocument();

  // Hight Password
  await waitFor(() => user.type(screen.getByLabelText('Password'), 'pwd@E1'));
  expect(screen.getByText(/nice password/i)).toBeInTheDocument();

  // confirm password
  await waitFor(() =>
    user.type(screen.getByLabelText('Confirm password'), 'pwd@E11')
  );
  user.click(screen.getByRole('button', { name: /sign up/i }));

  await waitFor(() => expect(push).not.toHaveBeenCalled());
  expect(screen.getByText(/passwords don"t match/i)).toBeInTheDocument();

  // checkboxes
  // I have read and agree to the Terms & Conditions
  // I understand that a wallet will be created for me
  user.click(
    screen.getByRole('checkbox', {
      name: /i have read and agree to the terms & conditions/i,
    })
  );
  user.click(
    screen.getByRole('checkbox', {
      name: /i understand that a wallet will be created for me/i,
    })
  );

  user.clear(screen.getByLabelText('Password'));
  user.clear(screen.getByLabelText('Confirm password'));
  await waitFor(() => {
    user.type(screen.getByLabelText('Password'), 'pwd@E1');
    user.type(screen.getByLabelText('Confirm password'), 'pwd@E1');
  });

  // onError
  const error = { message: 'Signup Error' };
  mock.onPost('/api/users/register').reply(400, error);
  user.click(screen.getByRole('button', { name: /sign up/i }));

  await waitFor(() => {
    expect(push).not.toHaveBeenCalled();
    expect(screen.getByText(error.message)).toBeInTheDocument();
  });

  // onSuccess
  mock.onPost('/api/users/register').reply(200);
  user.click(screen.getByRole('button', { name: /sign up/i }));

  await waitFor(() => {
    expect(push).toHaveBeenCalledWith('/');
  });
});
