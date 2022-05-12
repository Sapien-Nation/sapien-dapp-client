import { useSWRConfig } from 'swr';

// types
import type { RoomDetail, RoomDetailMember } from 'tools/types/room';

export const useRoomDetails = (roomID: string): RoomDetail => {
  const { cache } = useSWRConfig();
  return cache.get(`/core-api/room/${roomID}`);
};

export const useRoomMembers = (roomID: string): Array<RoomDetailMember> => {
  const { cache } = useSWRConfig();
  return cache.get(`/core-api/room/${roomID}/members`);
};
