import { useSWRConfig } from 'swr';

// types
import type { RoomDetail } from 'tools/types/room';

export const useRoomDetails = (roomID: string): RoomDetail => {
  const { cache } = useSWRConfig();
  return cache.get(`/core-api/room/${roomID}`);
};
