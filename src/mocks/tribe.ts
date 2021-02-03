// fixtures
import tribe1 from 'fixtures/tribe_1.json';
import tribe2 from 'fixtures/tribe_2.json';
import tribe3 from 'fixtures/tribe_3.json';
import tribe4 from 'fixtures/tribe_4.json';

export const mockTribe = ({ ...rest } = {}) => ({
  ...tribe1,
  ...rest
});

export const mockTribes = () => {
  return [tribe1, tribe2, tribe3, tribe4];
};
