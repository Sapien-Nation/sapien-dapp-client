// mui
import { Box, Typography, Button } from '@material-ui/core';
import {
  ChatBubbleOutlineOutlined as CommentsIcon,
  ShareOutlined as ShareIcon,
  Campaign as EchoIcon,
} from '@material-ui/icons';

const Actions = () => {
  return (
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
  );
};

export default Actions;
