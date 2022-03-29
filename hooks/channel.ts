// hooks
import { useTribeChannels } from './tribe';

interface Room {
  id: string;
  name: string;
}

export const useChannel = (tribeID: string, channelID: string): Room | null => {
  const channel = useTribeChannels(tribeID).find(({ id }) => id === channelID);

  if (channel) return channel;

  return null;
};
