// utils
import { render, screen } from 'utils/testUtils';

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
