import { captureException } from '@sentry/node';

// components
import ForgotPage from 'pages/forgot';

// utils
import { render, screen, user, waitFor } from 'utils/testUtils';

// mock data
const email = 'jhon@doe.com';
const error = 'Error';
const forgot = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

const getSendButton = () =>
  screen.getByRole('button', { name: 'Send request' });
const renderComponent = () => render(<ForgotPage />, { user: { forgot } });

// (captureException as jest.Mock).mockImplementation(() => {});

test('renders correctly', async () => {
  renderComponent();

  expect(
    screen.getByRole('heading', { name: 'Forgotten Password' })
  ).toBeInTheDocument();

  // links
  expect(screen.getByRole('link', { name: 'Log in' })).toHaveAttribute(
    'href',
    '/login'
  );

  // validation
  user.click(getSendButton());
  await waitFor(() => {
    expect(forgot).not.toHaveBeenCalled();
  });

  user.type(screen.getByLabelText(/email/i), email);

  // onError
  // forgot.mockRejectedValueOnce(error);
  // user.click(getSendButton());

  // await waitFor(() => {
  //   expect(forgot).toHaveBeenCalledWith({
  //     email,
  //   });

  //   expect(captureException).toHaveBeenCalledWith(error);
  //   expect(screen.getByText(error)).toBeInTheDocument();
  // });

  // onSuccess
  jest.clearAllMocks();
  user.click(getSendButton());
  await waitFor(() => {
    expect(forgot).toHaveBeenCalledWith({
      email,
    });

    expect(captureException).not.toHaveBeenCalledWith(error);
  });
});
