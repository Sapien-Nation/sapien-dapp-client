// utils
import { render, screen } from 'utils/testUtils';

// components
import CreateTribe from 'components/tribe/CreateTribe';

test('renders', () => {
  render(
    <CreateTribe
      onClose={() => {
        return;
      }}
    />
  );

  expect(screen.getByRole('heading', { name: /new tribe/i })).toHaveTextContent(
    '1 / 2'
  );
});
