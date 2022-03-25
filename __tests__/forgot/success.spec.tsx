// utils
import { render, screen, setLoggedOutUser } from 'utils/testUtils';

// components
import ForgotPasswordSuccess from 'pages/forgot/success';

beforeEach(() => {
  setLoggedOutUser();
});

test('forgot page', () => {
  render(<ForgotPasswordSuccess />);

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
      name: 'Check Your Inbox',
    })
  ).toBeInTheDocument();

  expect(
    (
      screen.getByRole('link', {
        name: 'Go to Sign in page',
      }) as HTMLLinkElement
    ).href
  ).toBe('http://localhost/login');
});
