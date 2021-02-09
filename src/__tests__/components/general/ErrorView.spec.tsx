// utils
import { render, screen, user } from 'utils/tests';

// components
import ErrorView from 'components/general/ErrorView';

const onClick = jest.fn();

test('render correctly', () => {
  const error = { message: 'Network Error' };
  render(<ErrorView error={error} onClick={onClick} />);

  expect(
    screen.getByRole('heading', { name: /network error/i })
  ).toBeInTheDocument();

  user.click(screen.getByRole('button', { name: /retry/i }));
  expect(onClick).toHaveBeenCalled();
});
