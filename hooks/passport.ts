import { useSWRConfig } from 'swr';

// types
import type { Passport } from 'tools/types/passport';

export const usePassport = (): Passport => {
  const { cache } = useSWRConfig();

  return cache.get('/core-api/me/passport');
};
