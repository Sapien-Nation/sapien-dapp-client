// utils
import { render, user, screen, waitFor } from 'utils/tests';

// components
import { DebounceSearch } from 'components/general';

// mock data
jest.useFakeTimers();

const onSearch = jest.fn();
const timeout = 500;
const defaultProps = {
  onSearch,
  timeout,
};

const renderComponent = () => render(<DebounceSearch {...defaultProps} />);

test('works correctly', async () => {
  renderComponent();

  const val = 'search';
  const searchBox = screen.getByRole('searchbox');
  user.clear(searchBox);
  user.type(searchBox, val);

  expect(onSearch).not.toHaveBeenCalled();

  jest.advanceTimersByTime(timeout);

  await waitFor(() => {
    jest.runAllTimers();
  });

  // TODO fix
  // expect(onSearch).toHaveBeenCalledWith(val);

  // clear
  expect(searchBox).toHaveValue(val);

  user.click(screen.getByRole('button', { name: /clear search/i }));

  expect(searchBox).toHaveValue('');
});
