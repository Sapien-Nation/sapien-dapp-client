// mui
import { Box, Typography, Button } from '@material-ui/core';
import {
  ChatBubbleOutlineOutlined as CommentsIcon,
  ShareOutlined as ShareIcon,
  Campaign as EchoIcon,
  Reply as ReplyIcon,
} from '@material-ui/icons';

interface Props {
  toggleReply: () => void;
}

const Actions = ({ toggleReply }: Props) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex">
        <Button
          color="primary"
          size="small"
          startIcon={<CommentsIcon color="action" fontSize="small" />}
        >
          <Typography color="textSecondary" variant="caption">
            0
          </Typography>
        </Button>
        <Button
          color="primary"
          size="small"
          startIcon={<EchoIcon color="action" fontSize="small" />}
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
      <Button color="primary" startIcon={<ReplyIcon />} onClick={toggleReply}>
        Reply
      </Button>
    </Box>
  );
};

export default Actions;
