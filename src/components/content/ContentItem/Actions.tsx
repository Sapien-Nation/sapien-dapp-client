// mui
import { Box, Typography, Button } from '@material-ui/core';
import {
  ChatBubbleOutlineOutlined as CommentsIcon,
  ShareOutlined as ShareIcon,
  Campaign as EchoIcon,
} from '@material-ui/icons';

interface Props {
  commentsCount: number;
  echoCount: number;
  shareCount: number;
}

const Actions = ({ commentsCount, echoCount, shareCount }: Props) => {
  return (
    <Box display="flex" paddingX={1.5}>
      <Button
        color="primary"
        size="small"
        startIcon={<CommentsIcon color="action" fontSize="small" />}
      >
        <Typography color="textSecondary" variant="caption">
          {commentsCount}
        </Typography>
      </Button>
      <Button
        color="primary"
        size="small"
        startIcon={<EchoIcon color="action" fontSize="small" />}
      >
        <Typography color="textSecondary" variant="caption">
          {echoCount}
        </Typography>
      </Button>
      <Button
        color="primary"
        size="small"
        startIcon={<ShareIcon color="action" fontSize="small" />}
      >
        <Typography color="textSecondary" variant="caption">
          {shareCount}
        </Typography>
      </Button>
    </Box>
  );
};

export default Actions;
