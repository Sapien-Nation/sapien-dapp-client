import useSWR from 'swr';

// types
import { User } from 'tools/types/user';

export const useMe = (): User =>
  useSWR<User>('/api/v3/user/me', { revalidateOnMount: false }).data;
