// mui
import { Box, Typography, Button } from '@material-ui/core';
import {
  ChatBubbleOutlineOutlined as CommentsIcon,
  ShareOutlined as ShareIcon,
  Campaign as EchoIcon,
  Reply as ReplyIcon,
} from '@material-ui/icons';

interface Props {
  commentsCount: number;
  echoCount: number;
  shareCount: number;
  toggleReply: () => void;
}

const Actions = ({
  commentsCount,
  echoCount,
  shareCount,
  toggleReply,
}: Props) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex">
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
      <Button color="primary" startIcon={<ReplyIcon />} onClick={toggleReply}>
        Reply
      </Button>
    </Box>
  );
};

export default Actions;
