// utils
import { render, screen, user } from 'utils/testUtils';

// context
import { TribeNavigationProvider, useTribeNavigation } from 'context/tribes';

// mocks
import { mockTribe } from 'mocks/tribe';

const tribe = mockTribe();

const Consumer = () => {
  const [tribeNavigation, setTribeNavigation] = useTribeNavigation();
  return (
    <>
      <button onClick={() => setTribeNavigation(tribe)}>Set Tribe</button>
      <h1>{tribeNavigation?.id}</h1>
    </>
  );
};

test('useTribeNavigation', () => {
  render(
    <TribeNavigationProvider>
      <Consumer />
    </TribeNavigationProvider>
  );

  expect(screen.queryByText(tribe.id)).not.toBeInTheDocument();

  user.click(screen.getByRole('button', { name: /set tribe/i }));

  expect(screen.getByRole('heading', { name: /1/i })).toBeInTheDocument();
});
