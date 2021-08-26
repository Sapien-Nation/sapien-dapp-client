import { useRouter } from 'next/router';

// mui
import { Box, Typography, Button, IconButton } from '@material-ui/core';
import {
  Campaign as EchoIcon,
  ChatBubbleOutlineOutlined as CommentsIcon,
  ShareOutlined as ShareIcon,
} from '@material-ui/icons';

// assets
import { BadgeIcon } from 'assets';

// types
import { Content } from 'tools/types/content';
import { User } from 'tools/types/user';

// styles
import { primary } from 'styles/colors';

// context
import { useWallet } from 'context/wallet';

interface Props {
  content: Content;
  user: User | null;
}

const Actions = ({ content, user }: Props) => {
  const { asPath, push } = useRouter();
  const { setWalletOpen } = useWallet();

  return (
    <Box display="flex">
      <Button
        aria-label="comment action button"
        color="primary"
        size="small"
        startIcon={<CommentsIcon color="action" fontSize="small" />}
        onClick={() => {
          if (user) {
            push(`${asPath}/content/${content.id}`);
          } else {
            push(
              `/register?from=${asPath}&contentID=${content.id}&action=comment`
            );
          }
        }}
      >
        <Typography color="textSecondary" variant="caption">
          0
        </Typography>
      </Button>
      <Button
        aria-label="Echo content"
        color="primary"
        size="small"
        startIcon={<EchoIcon color="action" fontSize="small" />}
        onClick={() => {
          if (user) {
            //
          } else {
            push(
              `/register?from=${asPath}&contentID=${content.id}&action=echo`
            );
          }
        }}
      >
        <Typography color="textSecondary" variant="caption">
          0
        </Typography>
      </Button>
      <Button
        aria-label="Share content"
        color="primary"
        size="small"
        startIcon={<ShareIcon color="action" fontSize="small" />}
      >
        <Typography color="textSecondary" variant="caption">
          0
        </Typography>
      </Button>
      <IconButton
        aria-label="Badge content"
        style={{
          padding: 6,
          marginLeft: 'auto',
          backgroundColor: primary[800],
        }}
        onClick={() => setWalletOpen(content.author)}
      >
        <BadgeIcon />
      </IconButton>
    </Box>
  );
};

export default Actions;
