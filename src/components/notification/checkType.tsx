// colors
import { blue, green, primary, secondary } from 'styles/colors';

//icons
import {
  ChatBubbleOutline,
  LocalOffer,
  PeopleOutline,
  SyncAlt,
} from '@material-ui/icons';

export const checkType = (type: string) => {
  switch (type) {
    case 'tribe.new_reply':
      return {
        color: green[200],
        icon: <ChatBubbleOutline style={{ color: green[700] }} />,
      };
    case 'token.badge_post1':
      return {
        color: primary[200],
        icon: <PeopleOutline style={{ color: primary[700] }} />,
      };
    case 'token.badge_post':
      return {
        color: secondary[200],
        icon: <SyncAlt style={{ color: secondary[700] }} />,
      };
    case 'store.badge_purchased':
      return {
        color: blue[200],
        icon: <LocalOffer style={{ color: blue[700] }} />,
      };
    default:
      return {
        color: secondary[200],
        icon: <SyncAlt style={{ color: secondary[700] }} />,
      };
  }
};
