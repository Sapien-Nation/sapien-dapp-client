// fixtures
import user1 from 'fixtures/user_1.json';

export const mockUser = ({ ...rest } = {}) => ({
  ...user1,
  ...rest,
});

export const mockUsers = () => {
  return [user1];
};
