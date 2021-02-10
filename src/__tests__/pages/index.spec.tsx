import preloadAll from 'jest-next-dynamic';

// utils
import { render, screen, user, waitFor, within } from 'utils/tests';

// components
import IndexPage from 'pages/index';

const renderComponent = () => render(<IndexPage />, { isPage: true });

const getTribeNavigation = () =>
  screen.getByRole('navigation', {
    name: /tribe navigation/i
  });

beforeEach(() => {
  preloadAll();
  jest.clearAllMocks();
});

test('render tribe bar and navigation', async () => {
  const mockDate = new Date('2021-02-08T00:00:00.943Z');
  jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockDate.toISOString());

  await waitFor(() => renderComponent());

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /index page/i })).toBeInTheDocument();
  });

  // Tribe bar
  const tribeBar = screen.getByRole('navigation', { name: /tribe bar/i });

  const tribes = within(tribeBar).getAllByRole('button');

  expect(within(tribes[0]).getByRole('img', { hidden: true })).toHaveAttribute(
    'alt',
    'Sapien'
  );
  expect(within(tribes[1]).getByRole('img', { hidden: true })).toHaveAttribute(
    'alt',
    'General'
  );
  expect(within(tribes[2]).getByRole('img', { hidden: true })).toHaveAttribute(
    'alt',
    'Settings'
  );
  expect(within(tribes[3]).getByRole('img', { hidden: true })).toHaveAttribute(
    'alt',
    'Messages'
  );
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

  expect(within(socialChannel).getByRole('img')).toHaveAttribute('alt', 'Social');
  expect(socialChannel).toHaveTextContent('Social');
  expect(socialChannel).toHaveTextContent('123 members');
  expect(socialChannel).toHaveTextContent('2 days');

  let gamingChannel = within(tribeNavigation).getByRole('button', {
    name: /gaming/i
  });

  expect(within(gamingChannel).getByRole('img')).toHaveAttribute('alt', 'Gaming');
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

  expect(within(gamingChannel).getByRole('img')).toHaveAttribute('alt', 'Gaming');
  expect(gamingChannel).toHaveTextContent('Gaming');
  expect(gamingChannel).toHaveTextContent('200 members');
  expect(socialChannel).toHaveTextContent('2 days');
});

test('create tribe', async () => {
  await waitFor(() => renderComponent());

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /index page/i })).toBeInTheDocument();
  });

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

  await waitFor(() => {
    user.type(screen.getByRole('textbox', { name: /name/i }), 'new tribe');
    user.type(screen.getByRole('textbox', { name: /unique identifier/i }), 'tribe');
    user.type(
      screen.getByRole('textbox', { name: /description/i }),
      'some description'
    );
    user.click(screen.getByRole('checkbox', { name: /tribe type/i }));
  });

  await waitFor(() => {
    expect(chartCount[0]).toHaveTextContent('9 / 36');
    expect(chartCount[1]).toHaveTextContent('5 / 15');
    expect(chartCount[2]).toHaveTextContent('16 / 60');
    expect(screen.getByRole('checkbox', { name: /tribe type/i })).toBeChecked();
  });

  user.click(screen.getByRole('button', { name: /next/i }));
  await waitFor(() => {
    expect(
      screen.getByRole('dialog', { name: /new tribe step 2 \/ 2/i })
    ).toBeInTheDocument();
  });
});

test('tribe navigation', async () => {
  await waitFor(() => renderComponent());

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /index page/i })).toBeInTheDocument();
  });

  let tribeNavigation = getTribeNavigation();
  expect(
    within(tribeNavigation).getByRole('heading', { name: /settings/i })
  ).toBeInTheDocument();

  user.click(
    within(
      screen.getByRole('navigation', { name: /tribe bar/i })
    ).getByRole('button', { name: /sapien/i })
  );

  tribeNavigation = getTribeNavigation();
  expect(
    within(tribeNavigation).getByRole('heading', { name: /sapien/i })
  ).toBeInTheDocument();

  // click channel
  const channels = within(tribeNavigation).getByRole('button', {
    name: /gaming/i
  });
  user.click(channels);

  // click badge store
  user.click(screen.getByRole('button', { name: /badge store/i }));

  // click tribe name
  user.click(within(tribeNavigation).getByRole('button', { name: /sapien/i }));
});
