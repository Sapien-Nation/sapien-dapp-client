import { cache } from 'swr';
import preloadAll from 'jest-next-dynamic';

// utils
import { render, screen, user, waitFor, within } from 'utils/tests';

// mocks
import { mockTopics } from 'mocks/topics';
import { mockTribes } from 'mocks/tribe';
import { mockUser } from 'mocks/user';
import { mockRouter } from 'mocks/routes';

// components
import General from 'pages/general';
import IndexPage from 'pages/index';
import { Navbar, Sidebar } from 'components/navigation';
import Layout from 'pages/Layout';

const renderComponent = (options = {}) =>
  render(
    <Layout>
      <General />
      <Sidebar />
      <main>
        <Navbar />
        <IndexPage />
      </main>
    </Layout>,
    {
      ...options
    }
  );

const getTribeNavigation = () =>
  screen.getByRole('navigation', {
    name: /tribe navigation/i
  });

beforeEach(() => {
  localStorage?.clear();
  preloadAll();

  cache.set('/api/users/me', { me: mockUser() });
  cache.set('/api/tribes/followed', { tribes: mockTribes() });
  cache.set('/api/topics/all', { topics: mockTopics() });

  jest.clearAllMocks();
});

describe('TribeBar', () => {
  test('render tribe bar and navigation', () => {
    const mockDate = new Date('2021-02-08T00:00:00.943Z');
    jest
      .spyOn(Date.prototype, 'toISOString')
      .mockReturnValue(mockDate.toISOString());

    renderComponent();

    // Tribe bar
    const tribeBar = screen.getByRole('navigation', { name: /tribe bar/i });

    const tribes = within(tribeBar).getAllByRole('button');

    expect(
      within(tribes[0]).getByRole('img', { hidden: true }, { hidden: true })
    ).toHaveAttribute('alt', 'Sapien');
    expect(
      within(tribes[1]).getByRole('img', { hidden: true }, { hidden: true })
    ).toHaveAttribute('alt', 'General');
    expect(
      within(tribes[2]).getByRole('img', { hidden: true }, { hidden: true })
    ).toHaveAttribute('alt', 'Settings');
    expect(
      within(tribes[3]).getByRole('img', { hidden: true }, { hidden: true })
    ).toHaveAttribute('alt', 'Messages');
    expect(
      within(tribeBar).getByRole('button', { name: /sapien/i })
    ).toHaveTextContent('10');
    expect(
      within(tribeBar).getByRole('button', { name: /general/i })
    ).toHaveTextContent('0');
    expect(
      within(tribeBar).getByRole('button', { name: /settings/i })
    ).toHaveTextContent('0');
    expect(
      within(tribeBar).getByRole('button', { name: /messages/i })
    ).toHaveTextContent('0');

    // Tribe navigation
    let tribeNavigation = getTribeNavigation();

    expect(
      within(tribeNavigation).getByRole('heading', { name: /sapien/i })
    ).toBeInTheDocument();

    expect(
      within(tribeNavigation).getByRole('heading', { name: /badge store/i })
    ).toBeInTheDocument();
    expect(
      within(tribeNavigation).getByRole('heading', { name: /channels/i })
    ).toBeInTheDocument();

    const socialChannel = within(tribeNavigation).getByRole('button', {
      name: /social/i
    });

    expect(within(socialChannel).getByRole('img', { hidden: true })).toHaveAttribute(
      'alt',
      'Social'
    );
    expect(socialChannel).toHaveTextContent('Social');
    expect(socialChannel).toHaveTextContent('123 members');
    expect(socialChannel).toHaveTextContent('2 days');

    let gamingChannel = within(tribeNavigation).getByRole('button', {
      name: /gaming/i
    });

    expect(within(gamingChannel).getByRole('img', { hidden: true })).toHaveAttribute(
      'alt',
      'Gaming'
    );
    expect(gamingChannel).toHaveTextContent('Gaming');
    expect(gamingChannel).toHaveTextContent('200 members');
    expect(socialChannel).toHaveTextContent('2 days');

    // select tribe
    user.click(within(tribeBar).getByRole('button', { name: /settings/i }));
    tribeNavigation = getTribeNavigation();
    expect(
      within(tribeNavigation).getByRole('heading', { name: /settings/i })
    ).toBeInTheDocument();

    gamingChannel = within(tribeNavigation).getByRole('button', {
      name: /gaming/i
    });

    expect(within(gamingChannel).getByRole('img', { hidden: true })).toHaveAttribute(
      'alt',
      'Gaming'
    );
    expect(gamingChannel).toHaveTextContent('Gaming');
    expect(gamingChannel).toHaveTextContent('200 members');
    expect(socialChannel).toHaveTextContent('2 days');
  });

  test('discovery', async () => {
    renderComponent();

    user.click(screen.getByRole('button', { name: /discover tribes/i }));

    expect(screen.getByText('TOPICS')).toBeInTheDocument();
    expect(screen.getByText('All Topics')).toBeInTheDocument();

    expect(
      screen.getByRole('listitem', { name: /topic: humor/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('listitem', { name: /topic: travel/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('listitem', { name: /topic: business/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('listitem', { name: /topic: style/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('listitem', { name: /topic: animals/i })
    ).toBeInTheDocument();
  });

  test('create tribe', async () => {
    renderComponent();

    user.click(screen.getByRole('button', { name: /create tribe/i }));

    expect(
      screen.getByRole('dialog', { name: /new tribe step 1 \/ 2/i })
    ).toBeInTheDocument();

    user.click(screen.getByRole('button', { name: /next/i }));
    expect(
      screen.getByRole('dialog', { name: /new tribe step 1 \/ 2/i })
    ).toBeInTheDocument();

    const chartCount = screen.getAllByTestId('chart-count');
    expect(chartCount[0]).toHaveTextContent('0 / 36');
    expect(chartCount[1]).toHaveTextContent('0 / 15');
    expect(chartCount[2]).toHaveTextContent('0 / 60');
    expect(screen.getByRole('checkbox', { name: /tribe type/i })).not.toBeChecked();

    user.type(screen.getByRole('textbox', { name: /name/i }), 'new tribe');
    user.type(screen.getByRole('textbox', { name: /unique identifier/i }), 'tribe');
    user.type(
      screen.getByRole('textbox', { name: /description/i }),
      'some description'
    );
    user.click(screen.getByRole('checkbox', { name: /tribe type/i }));

    expect(chartCount[0]).toHaveTextContent('9 / 36');
    expect(chartCount[1]).toHaveTextContent('5 / 15');
    expect(chartCount[2]).toHaveTextContent('16 / 60');
    expect(screen.getByRole('checkbox', { name: /tribe type/i })).toBeChecked();

    user.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: /new tribe step 2 \/ 2/i })
      ).toBeInTheDocument();
    });

    // TODO test step2
  });
});

describe('TribeNavigation', () => {
  test('render correctly', () => {
    renderComponent();

    let tribeNavigation = getTribeNavigation();
    expect(
      within(tribeNavigation).getByRole('heading', { name: /sapien/i })
    ).toBeInTheDocument();

    user.click(
      within(
        screen.getByRole('navigation', { name: /tribe bar/i })
      ).getByRole('button', { name: /settings/i })
    );

    tribeNavigation = getTribeNavigation();
    expect(
      within(tribeNavigation).getByRole('heading', { name: /settings/i })
    ).toBeInTheDocument();

    // click channel
    const channels = within(tribeNavigation).getByRole('button', {
      name: /gaming/i
    });
    user.click(channels);

    // click badge store
    user.click(screen.getByRole('button', { name: /badge store/i }));

    // click tribe name
    user.click(within(tribeNavigation).getByRole('button', { name: /settings/i }));
  });
});

describe('Navbar', () => {
  test('logged in', () => {
    const { rerender } = renderComponent();

    const userMenu = screen.getByRole('button', { name: /slowpoke rodriguez/i });
    expect(userMenu).toBeInTheDocument();
    expect(
      within(userMenu).getByRole('img', { hidden: true }, { hidden: true })
    ).toHaveAttribute('alt', 'Slowpoke Rodriguez');

    // menu
    user.click(userMenu);

    const logoutItem = screen.getByRole('menuitem', { name: /logout/i });
    expect(logoutItem).toBeInTheDocument();

    // logout
    cache.set('/api/users/me', undefined);
    user.click(logoutItem);
    rerender(
      <Layout>
        <Sidebar />
        <main>
          <Navbar />
          <IndexPage />
        </main>
      </Layout>
    );
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('logged out', async () => {
    cache.set('/api/users/me', undefined);
    const push = jest.fn();

    const { rerender } = renderComponent();

    // Show Dialog
    user.click(screen.getByRole('button', { name: /login/i }));

    rerender(
      <Layout>
        <General />
        <Sidebar />
        <main>
          <Navbar />
          <IndexPage />
        </main>
      </Layout>,
      {
        router: { ...mockRouter(), asPath: 'http:localhost:3000/#signup', push }
      }
    );

    expect(screen.getByRole('dialog', { name: /login/i })).toBeInTheDocument();

    // login the user
    cache.set('/api/users/me', { me: mockUser() });
    user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('http:localhost:3000/', undefined, {
        shallow: false
      });
    });

    rerender(
      <Layout>
        <General />
        <Sidebar />
        <main>
          <Navbar />
          <IndexPage />
        </main>
      </Layout>,
      {
        router: { ...mockRouter(), asPath: 'http:localhost:3000' }
      }
    );

    expect(screen.queryByRole('dialog', { name: /login/i })).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /slowpoke rodriguez/i })
    ).toBeInTheDocument();
  });
});
