// fixtures
import tribe from 'fixtures/tribe_1.json';

export const mockTribe = ({ ...rest }) => ({
  ...tribe,
  ...rest
});
