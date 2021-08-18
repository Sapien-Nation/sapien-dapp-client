// mui
import { Box, Typography, Button } from '@material-ui/core';
import {
  ShareOutlined as ShareIcon,
  Campaign as EchoIcon,
} from '@material-ui/icons';

const Actions = () => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex">
        <Button
          aria-label="Reply on a content"
          color="primary"
          size="small"
          startIcon={<EchoIcon color="action" fontSize="small" />}
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
      </Box>
    </Box>
  );
};

export default Actions;
