// utils
import { render, screen } from 'utils/testUtils';

// components
import NotFoundPage from 'pages/404';

test('404 page', () => {
  render(<NotFoundPage />);

  expect(screen.getByRole('img', { name: 'sapien' })).toHaveAttribute(
    'src',
    '/images/logooutlined.svg'
  );

  expect(
    screen.getByRole('heading', {
      name: 'This page does not exist.',
    })
  );
  expect(
    screen.getByRole('heading', {
      name: 'Popular pages',
    })
  );

  expect(
    screen.getByRole('heading', {
      name: '# Discovery',
    })
  );

  expect(
    screen.getByRole('heading', {
      name: 'This page does not exist.',
    })
  );

  expect(
    (
      screen.getByRole('link', {
        name: '# General Room',
      }) as HTMLLinkElement
    ).href
  ).toBe('http://localhost/');
  expect(
    (
      screen.getByRole('link', {
        name: '# Discovery',
      }) as HTMLLinkElement
    ).href
  ).toBe('http://localhost/discovery');
  expect(
    (
      screen.getByRole('link', {
        name: 'Back Home',
      }) as HTMLLinkElement
    ).href
  ).toBe('http://localhost/');
  // const heading = screen.getByRole('heading', {
  //   name: 'Whoops looks like something went wrong...',
  // });

  // expect(
  //   (
  //     screen.getByRole('link', {
  //       name: 'Back Home',
  //     }) as HTMLLinkElement
  //   ).href
  // ).toBe('http://localhost//');

  // expect(heading).toBeInTheDocument();
});
