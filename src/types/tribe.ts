// types
import { Channel } from 'types/channel';

export type Tribe = {
  channels: Array<Channel>;
  id: string;
  name: string;
  image: string;
  notificationNumber: number;
};
