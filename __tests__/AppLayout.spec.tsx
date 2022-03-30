// utils
import {
  mockUser,
  render,
  screen,
  setAllTribes,
  setLoggedOutUser,
  setUser,
  user,
} from 'utils/testUtils';

// components
import { AppLayout } from 'components';

// mocks
import { mockProfileTribe, mockProfileTribeChannel } from 'tools/mocks/tribe';

const channel1 = mockProfileTribeChannel();
const tribe1 = mockProfileTribe({ channels: [channel1] });
const tribe2 = mockProfileTribe({ id: '2000' });
const tribes = [tribe1, tribe2];

beforeEach(() => {
  setAllTribes(tribes);
});

describe('AuthRoutes', () => {
  const renderAuthRoute = (pathname: string) =>
    render(
      <AppLayout>
        <span>Children Auth</span>
      </AppLayout>,
      { route: { pathname } }
    );
  test('login page', () => {
    renderAuthRoute('/login');

    expect(screen.getByText('Children Auth')).toBeInTheDocument();
  });

  test('register page', () => {
    renderAuthRoute('/register');

    expect(screen.getByText('Children Auth')).toBeInTheDocument();
  });

  test('register page', () => {
    renderAuthRoute('/logout');

    expect(screen.getByText('Children Auth')).toBeInTheDocument();
  });

  test('register page', () => {
    renderAuthRoute('/forgot');

    expect(screen.getByText('Children Auth')).toBeInTheDocument();
  });

  test('register page', () => {
    renderAuthRoute('/change-password');

    expect(screen.getByText('Children Auth')).toBeInTheDocument();
  });
});

test('not logged in', () => {
  setLoggedOutUser();

  const push = jest.fn();
  render(
    <AppLayout>
      <span>Not Render</span>
    </AppLayout>,
    { route: { push } }
  );

  expect(push).toHaveBeenCalledWith('/login');
  expect(screen.queryByText('Not Render')).not.toBeInTheDocument();
});

describe('LoggedIn', () => {
  let loggedInUser = null;
  beforeEach(() => {
    loggedInUser = setUser(mockUser({ avatar: 'http://someurl.com' }));
  });

  test('render tribe bar', () => {
    render(
      <AppLayout>
        <span>Some View</span>
      </AppLayout>
    );

    // top
    expect(
      (
        screen.getByRole('link', {
          name: 'Go to Test Tribe 1000',
        }) as HTMLLinkElement
      ).href
    ).toBe('http://localhost/tribes/1000/home');
    expect(
      (
        screen.getByRole('link', {
          name: 'Go to Test Tribe 2000',
        }) as HTMLLinkElement
      ).href
    ).toBe('http://localhost/tribes/2000/home');
    expect(
      (
        screen.getByRole('link', {
          name: 'Go to Explore',
        }) as HTMLLinkElement
      ).href
    ).toBe('http://localhost/discovery');

    // Actions
    expect(
      screen.getByRole('button', { name: 'Click here to create a new Tribe' })
    ).toBeInTheDocument();

    // bottom
    expect(
      screen.getByRole('img', {
        name: 'this is your avatar picture on the bottom of the tribe bar navigation',
      })
    ).toHaveAttribute('src', loggedInUser.avatar);
  });

  test('can create tribe', () => {
    render(
      <AppLayout>
        <span>Some View</span>
      </AppLayout>
    );

    user.click(
      screen.getByRole('button', { name: 'Click here to create a new Tribe' })
    );

    expect(
      screen.getByRole('dialog', { name: 'Create a Tribe' })
    ).toBeInTheDocument();

    // TODO finish test
  });

  test('tribe navigation', () => {
    // TODO
  });

  test('can create channel', () => {
    // TODO
  });

  test('can create rooms', () => {
    // TODO
  });
});
