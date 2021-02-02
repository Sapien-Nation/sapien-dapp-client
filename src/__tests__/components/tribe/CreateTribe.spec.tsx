// utils
import { render, screen } from 'utils/testUtils';

// components
import CreateTribe from 'components/tribe/CreateTribeModal';

// mocks
const onClose = jest.fn();

const defaultProps = {
  onClose
};

test('renders', () => {
  render(<CreateTribe {...defaultProps} />);

  expect(screen.getByRole('heading', { name: /new tribe/i })).toHaveTextContent(
    '1 / 2'
  );
});
