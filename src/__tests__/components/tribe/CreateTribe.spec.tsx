// utils
import { render, screen } from 'utils/tests';

// components
import { CreateTribeModal } from 'components/tribe/modals';

// mocks
const onClose = jest.fn();

const defaultProps = {
  onClose
};

test('renders', () => {
  render(<CreateTribeModal {...defaultProps} />);

  expect(screen.getByRole('heading', { name: /new tribe/i })).toBeInTheDocument();
});
