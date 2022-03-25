// utils
import { render, screen } from 'utils/testUtils';

// components
import NotFoundPage from 'pages/404';

test('404 page', () => {
  render(<NotFoundPage />);

  const heading = screen.getByRole('heading', {
    name: 'Whoops looks like something went wrong...',
  });

  expect(
    (
      screen.getByRole('link', {
        name: 'Back Home',
      }) as HTMLLinkElement
    ).href
  ).toBe('http://localhost/');

  expect(heading).toBeInTheDocument();
});
