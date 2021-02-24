import { cache } from 'swr';
import preloadAll from 'jest-next-dynamic';
import MockAdapter from 'axios-mock-adapter';

// types
import type { Tribe } from 'types/tribe';
import type { Topic } from 'types/topic';

// api
import axios from 'api';

// utils
import { render, screen, user, waitFor, within } from 'utils/tests';

// mocks
import { mockTopics } from 'mocks/topics';
import { mockTribes } from 'mocks/tribe';
import { mockUser } from 'mocks/user';

// components
import IndexPage from 'pages/index';

// mocks
const tribes: Array<Tribe> = mockTribes();
const topics: Array<Topic> = mockTopics();

const renderComponent = (options = {}) =>
  render(<IndexPage />, {
    ...options,
  });

const getTribeNavigation = () =>
  screen.getByRole('navigation', {
    name: /tribe navigation/i,
  });

const getTribeBar = () =>
  screen.getByRole('navigation', { name: /tribe bar/i });

beforeEach(() => {
  localStorage?.clear();
  preloadAll();

  cache.set('/api/users/me', { me: mockUser() });
  cache.set('/api/tribes/followed', { tribes });
  cache.set('/api/topics/all', { topics });

  jest.clearAllMocks();
});

describe('TribeBar', () => {
  test('render correctly', () => {
    const mockDate = new Date('2021-02-08T00:00:00.943Z');
    jest
      .spyOn(Date.prototype, 'toISOString')
      .mockReturnValue(mockDate.toISOString());

    renderComponent();

    const tribeBar = getTribeBar();

    tribes.forEach((tribe) => {
      expect(
        within(tribeBar).getByRole('button', { name: tribe.name })
      ).toHaveTextContent(String(tribe.notificationNumber));
    });

    expect(
      screen.getByRole('button', { name: /discover tribes/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create tribe/i })
    ).toBeInTheDocument();
  });

  test('discovery', () => {
    renderComponent();

    user.click(screen.getByRole('button', { name: /discover tribes/i }));

    expect(screen.getByText('TOPICS')).toBeInTheDocument();
    expect(screen.getByText('All Topics')).toBeInTheDocument();

    topics.forEach((topic) => {
      expect(
        screen.getByRole('listitem', { name: `topic: ${topic.name}` })
      ).toBeInTheDocument();
    });
  });

  test('create tribe', async () => {
    const mock = new MockAdapter(axios);
    renderComponent();

    user.click(screen.getByRole('button', { name: /create tribe/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: /new tribe step 1 \/ 2/i })
      ).toBeInTheDocument();
    });

    // Summary Step
    const chartCount = screen.getAllByTestId('chart-count');
    expect(chartCount[0]).toHaveTextContent('0 / 36');
    expect(chartCount[1]).toHaveTextContent('0 / 15');
    expect(chartCount[2]).toHaveTextContent('0 / 60');
    expect(
      screen.getByRole('checkbox', { name: /tribe type/i })
    ).not.toBeChecked();

    // validation
    user.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: /new tribe step 1 \/ 2/i })
      ).toBeInTheDocument();
    });

    // onChange
    const newTribe = 'Sports';
    await waitFor(() => {
      user.type(screen.getByRole('textbox', { name: /name/i }), newTribe);
      user.type(
        screen.getByRole('textbox', { name: /unique identifier/i }),
        'tribe'
      );
      user.type(
        screen.getByRole('textbox', { name: /description/i }),
        'some description'
      );
    });
    user.click(screen.getByRole('checkbox', { name: /tribe type/i }));

    expect(chartCount[0]).toHaveTextContent('6 / 36');
    expect(chartCount[1]).toHaveTextContent('5 / 15');
    expect(chartCount[2]).toHaveTextContent('16 / 60');
    expect(screen.getByRole('checkbox', { name: /tribe type/i })).toBeChecked();

    // MediaStep
    user.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: /new tribe step 2 \/ 2/i })
      ).toBeInTheDocument();
    });

    // onError
    const error = { message: 'Create Tribe Error' };
    mock.onPost('/api/tribes/create').reply(400, error);
    user.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });

    // onSuccess
    mock.onPost('/api/tribes/create').reply(200, { data: '1000' });
    user.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {});
    expect(
      within(getTribeBar()).getByRole('button', { name: newTribe })
    ).toHaveTextContent('0');
  });
});

describe('TribeNavigation', () => {
  test('render correctly', () => {
    renderComponent();

    // default render
    const tribeNavigation = getTribeNavigation();
    expect(
      within(tribeNavigation).getByRole('heading', { name: tribes[0].name })
    ).toBeInTheDocument();

    // handling navigation
    const tribeToClick = tribes[1];
    user.click(
      within(getTribeBar()).getByRole('button', { name: tribeToClick.name })
    );
    expect(
      within(tribeNavigation).getByRole('heading', { name: tribeToClick.name })
    ).toBeInTheDocument();

    // render channels
    tribeToClick.channels.forEach((channel) => {
      const channelButton = within(tribeNavigation).getByRole('button', {
        name: channel.name,
      });
      expect(channelButton).toHaveTextContent(
        `${channel.name}${channel.memberCount} members`
      );
      user.click(channelButton);
    });

    // click badge store
    user.click(screen.getByRole('button', { name: /badge store/i }));

    // click tribe name
    user.click(
      within(tribeNavigation).getByRole('button', { name: tribeToClick.name })
    );
  });

  test('Create Channel', async () => {
    const mock = new MockAdapter(axios);
    renderComponent();

    const tribeNavigation = getTribeNavigation();

    user.click(
      within(tribeNavigation).getByRole('button', { name: /create channel/i })
    );

    await waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: /new channel step 1 \/ 4/i })
      ).toBeInTheDocument();
    });

    // SummaryStep
    const chartCount = screen.getAllByTestId('chart-count');
    expect(chartCount[0]).toHaveTextContent('0 / 36');
    expect(chartCount[1]).toHaveTextContent('0 / 60');

    // validation
    user.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: /new channel step 1 \/ 4/i })
      ).toBeInTheDocument();
    });

    // onChange
    const newChannel = 'tibia';
    await waitFor(() => {
      user.type(screen.getByRole('textbox', { name: /name/i }), newChannel);
      user.type(
        screen.getByRole('textbox', { name: /description/i }),
        'some channel'
      );
    });

    expect(chartCount[0]).toHaveTextContent('5 / 36');
    expect(chartCount[1]).toHaveTextContent('12 / 60');

    // Badges Step
    user.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: /new channel step 2 \/ 4/i })
      ).toBeInTheDocument();
    });

    // Media Step
    user.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: /new channel step 3 \/ 4/i })
      ).toBeInTheDocument();
    });

    // RSS Step
    user.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: /new channel step 4 \/ 4/i })
      ).toBeInTheDocument();
    });

    // onError
    const error = { message: 'Create Channel Error' };
    mock.onPost('/api/channels/create').reply(400, error);
    user.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });

    // onSuccess
    mock.onPost('/api/channels/create').reply(200, { data: '1001' });
    user.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(
        within(getTribeNavigation()).getByRole('button', {
          name: newChannel,
        })
      ).toHaveTextContent(`${newChannel}0 members`);
    });
  });
});

describe('Navbar', () => {
  test('logged in', () => {
    const { rerender } = renderComponent();

    const userMenu = screen.getByRole('button', {
      name: /slowpoke rodriguez/i,
    });
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
    rerender(<IndexPage />);
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });

  test('logged out', () => {
    cache.set('/api/users/me', undefined);

    renderComponent();

    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });
});
