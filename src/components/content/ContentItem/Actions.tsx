import { useRouter } from 'next/router';

// mui
import { Box, Typography, Button } from '@material-ui/core';
import {
  ChatBubbleOutlineOutlined as CommentsIcon,
  ShareOutlined as ShareIcon,
  Campaign as EchoIcon,
} from '@material-ui/icons';

// types
import { Content } from 'tools/types/content';
import { User } from 'tools/types/user';

interface Props {
  content: Content;
  user: User | null;
}

const Actions = ({ content, user }: Props) => {
  const { asPath, push } = useRouter();

  return (
    <Box display="flex">
      <Button
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
          0
        </Typography>
      </Button>
      <Button
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
        color="primary"
        size="small"
        startIcon={<ShareIcon color="action" fontSize="small" />}
      >
        <Typography color="textSecondary" variant="caption">
          0
        </Typography>
      </Button>
    </Box>
  );
};

export default Actions;
