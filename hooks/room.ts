import { useSWRConfig } from 'swr';

// hooks
import { useTribeRooms } from './tribe';

interface Room {
  id: string;
  name: string;
}

export const useRoom = (tribeID: string, roomID: string): Room | null => {
  const { cache } = useSWRConfig();

  const room = useTribeRooms(tribeID).find(({ id }) => id === roomID);

  if (room) return room;

  return null;
};