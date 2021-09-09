import { useRouter } from 'next/router';

// mui
import { Box, Button, IconButton, List, Typography } from '@material-ui/core';
import {
  Campaign as EchoIcon,
  ChatBubbleOutlineOutlined as CommentsIcon,
  ShareOutlined as ShareIcon,
} from '@material-ui/icons';

// assets
import { BadgeIcon } from 'assets';

// types
import { Content, ContentBadge } from 'tools/types/content';
import { User } from 'tools/types/user';

// styles
import { primary } from 'styles/colors';

// context
import { useWallet } from 'context/wallet';

interface Props {
  content: Content;
  user: User | null;
}

interface BadgesProps {
  badges: Array<ContentBadge> | null;
}

const Badges = ({ badges }: BadgesProps) => {
  return (
    <List style={{ display: 'flex', padding: '0px' }}>
      {badges.map((badge: ContentBadge, index) => {
        const noFirstBadge = index !== 0;
        return (
          <li
            key={badge.id}
            style={{
              display: 'flex',
              marginLeft: noFirstBadge ? '-7px' : '0px',
              border: '2px solid white',
              borderRadius: '20px',
            }}
          >
            <img alt={badge.name} height="20" src={badge.avatar} width="20" />
          </li>
        );
      })}
    </List>
  );
};

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
            push(asPath);
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
      {content.badges.length > 0 && (
        <Button
          aria-label="Share content"
          color="primary"
          size="small"
          startIcon={<Badges badges={content.badges} />}
        >
          <Typography color="textSecondary" variant="caption">
            {content.spn / 1e6}
          </Typography>
        </Button>
      )}
      <IconButton
        aria-label="Badge content"
        style={{
          padding: 6,
          marginLeft: 'auto',
          backgroundColor: primary[800],
        }}
        onClick={() => setWalletOpen(content)}
      >
        <BadgeIcon />
      </IconButton>
    </Box>
  );
};

export default Actions;
