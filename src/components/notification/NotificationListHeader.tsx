//icons
import { Settings } from '@material-ui/icons';

// mui
import { Box, Button, IconButton, Typography } from '@material-ui/core';

const NotificationListHeader = () => {
  return (
    <Box
      alignItems="center"
      component="li"
      display="flex"
      justifyContent="space-between"
      marginBottom={1}
      paddingX={1}
    >
      <Typography variant="h3">Notifications</Typography>
      <Box>
        <Button aria-label="Mark all notifications as read" variant="text">
          <Typography color="textSecondary" component="span" variant="button">
            Mark all as read
          </Typography>
        </Button>
        <IconButton aria-label="Notification settings">
          <Settings fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NotificationListHeader;
