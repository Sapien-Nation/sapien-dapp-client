//icons
import { Settings } from '@material-ui/icons';

// mui
import { Box, Button, IconButton, Typography } from '@material-ui/core';

const NotificationListHeader = () => {
  return (
    <Box
      alignItems="center"
      display="flex"
      justifyContent="space-between"
      paddingX={1}
    >
      <Typography variant="h3">Notifications</Typography>
      <Box>
        <Button variant="text">
          <Typography color="textSecondary" component="span" variant="button">
            Mark all as read
          </Typography>
        </Button>
        <IconButton>
          <Settings fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NotificationListHeader;
