import { cache } from 'swr';

// utils
import { createRandomString, render, screen, user, waitFor } from 'utils/tests';

// components
import Discovery from 'components/discovery';

// mocks
import { mockTribes } from 'tools/mocks/tribe';

const suggested = mockTribes();
const tribes = mockTribes();

const renderComponent = () => render(<Discovery />);

beforeEach(() => {
  cache.set('/api/discovery/tribe', { suggested, tribes });
  jest.clearAllMocks();
});

test('Discovery', async () => {
  renderComponent();

  expect(screen.getByText(/Discovery/i)).toBeInTheDocument();
  let searchTerm = createRandomString(10);

  await waitFor(() => {
    user.type(screen.getByRole('searchbox'), searchTerm);
  });
  expect(screen.getByRole('searchbox')).toHaveValue(searchTerm);
  await waitFor(() => user.click(screen.getByLabelText(/clear search/i)));
  expect(screen.getByRole('searchbox')).toHaveValue('');

  // Search a tribe
  searchTerm = 'Sapien';
  cache.set(`/api/discovery/tribe?search=${searchTerm}`, { suggested, tribes });
  await waitFor(() => {
    user.type(screen.getByRole('searchbox'), searchTerm);
  });
  await waitFor(() => {
    expect(screen.getAllByText(/Sapien/i)[0]).toBeInTheDocument();
  });
});
