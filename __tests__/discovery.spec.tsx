// utils
import { cache, render, screen, within } from 'utils/testUtils';

// components
import DiscoveryPage from 'pages/discovery';

// mocks
import { mockDiscoveryTribe } from 'tools/mocks/tribe';

const tribes = [
  mockDiscoveryTribe({ description: '', membersCount: 10 }),
  mockDiscoveryTribe({ id: '2000', description: 'foo bar' }),
  mockDiscoveryTribe({ id: '3000', description: 'foo bar lol' }),
  mockDiscoveryTribe({ id: '4000', description: 'foo bar lol lol' }),
];

beforeEach(() => {
  cache.set('/api/v3/tribe/discovery', tribes);
});

test('discovery page', () => {
  render(<DiscoveryPage />);

  const items = screen.getAllByRole('listitem');

  tribes.forEach((item, index) => {
    const listItem = items[index];
    expect(
      screen.getByRole('heading', { name: item.name })
    ).toBeInTheDocument();

    // First item don't have description
    if (index === 0) {
      expect(
        within(listItem).getByText('[No Description]')
      ).toBeInTheDocument();
    } else {
      expect(screen.getByText(item.description)).toBeInTheDocument();
    }

    // First item have more than 1 members
    if (index === 0) {
      expect(within(listItem).getByText('10 members')).toBeInTheDocument();
    } else {
      expect(within(listItem).getByText('0 member')).toBeInTheDocument();
    }

    expect(
      within(listItem).getByRole('button', { name: 'Join' })
    ).toBeInTheDocument();
  });
});
