// utils
import { render, screen, user } from 'utils/testUtils';

// context
import { NavigationProvider, useNavigation } from 'context/tribes';

// mocks
import { mockTribe } from 'mocks/tribe';

const tribe = mockTribe();

const Consumer = () => {
  const [navigation, setNavigation] = useNavigation();
  return (
    <>
      <button onClick={() => setNavigation({ tribe })}>Set Tribe</button>
      <h1>{navigation?.tribe.id}</h1>
    </>
  );
};

test('useTribeNavigation', () => {
  render(
    <NavigationProvider>
      <Consumer />
    </NavigationProvider>
  );

  expect(screen.queryByText(tribe.id)).not.toBeInTheDocument();

  user.click(screen.getByRole('button', { name: /set tribe/i }));

  expect(screen.getByRole('heading', { name: /1/i })).toBeInTheDocument();
});
