import { cache } from 'swr';

// utils
import { render, screen } from 'utils/tests';

// types
import type { Topic } from 'tools/types/topic';

// components
import { DiscoverNavigation } from 'components/navigation/TribeNavigation';

// mocks
import { mockTopics } from 'tools/mocks/topics';

const topics: Array<Topic> = mockTopics();

const renderComponent = () => render(<DiscoverNavigation />);

beforeEach(() => {
  cache.set('/api/topics/all', { topics });

  jest.clearAllMocks();
});

test('discovery', () => {
  renderComponent();

  expect(screen.getByText('TOPICS')).toBeInTheDocument();
  expect(screen.getByText('All Topics')).toBeInTheDocument();

  topics.forEach((topic) => {
    expect(
      screen.getByRole('listitem', { name: `topic: ${topic.name}` })
    ).toBeInTheDocument();
  });
});
