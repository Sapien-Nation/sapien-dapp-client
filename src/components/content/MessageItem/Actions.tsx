import { useRouter } from 'next/router';

// mui
import { Box, Typography, Button, IconButton } from '@material-ui/core';
import { ChatBubbleOutlineOutlined as CommentsIcon } from '@material-ui/icons';

// assets
import { BadgeIcon } from 'assets';

// types
import { User } from 'tools/types/user';

// styles
import { primary } from 'styles/colors';

// context
import { useWallet } from 'context/wallet';

interface Props {
  content: any;
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
            //
          } else {
            push(
              `/register?from=${asPath}&contentID=${content.id}&action=comment`
            );
          }
        }}
      >
        <Typography color="textSecondary" variant="caption">
          {content.badgesCount || 0}
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
