import { useSWRConfig } from 'swr';

// types
import type { UserPassport } from 'tools/types/user';

export const usePassport = (): UserPassport => {
  const { cache } = useSWRConfig();

  return cache.get('/core-api/passport');
};
