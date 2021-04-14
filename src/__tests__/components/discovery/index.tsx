// utils
import { createRandomString, render, screen, user, waitFor } from 'utils/tests';

// components
import Discovery from 'components/discovery';

const renderComponent = () => render(<Discovery />);

beforeEach(() => {
  jest.clearAllMocks();
});

test('Discovery', async () => {
  renderComponent();

  expect(screen.getByText(/Discovery/i)).toBeInTheDocument();
  const searchTerm = createRandomString(10);

  await waitFor(() => {
    user.type(screen.getByRole('searchbox'), searchTerm);
  });
  expect(screen.getByRole('searchbox')).toHaveValue(searchTerm);
  await waitFor(() => user.click(screen.getByLabelText(/clear search/i)));
  expect(screen.getByRole('searchbox')).toHaveValue('');
});
