import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { matchSorter } from 'match-sorter';
import { useCopyToClipboard } from 'react-use';

// types
import type { User } from 'tools/types/user';

// api
import axios from 'api';

// next
import Image from 'next/image';

// styles
import { background, purple } from 'styles/colors';

// mui
import {
  Avatar,
  Box,
  Button,
  Fab,
  IconButton,
  Typography,
  makeStyles,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Close as CloseIcon,
  FileCopy as FileCopyIcon,
} from '@material-ui/icons';

// components
import Dialog from 'components/dialog';
import { DebounceSearch } from 'components/general';
import Query from 'components/query';

interface Props {
  link: string;
  onClose: () => void;
}
const useStyles = makeStyles(() => ({
  listItem: {
    '&:hover': {
      borderRadius: '1rem',
      backgroundColor: 'rgba(143, 146, 161, 0.1)',
    },
  },
}));

const Invite = ({ link, onClose }: Props) => {
  const classes = useStyles();
  const [invited, setInvited] = useState<Array<User>>([]);
  const [state, copyToClipboard] = useCopyToClipboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [usersToInvite, setUsersToInvite] = useState<Array<User>>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (state.value) {
      enqueueSnackbar('Copied to clipboard');
    }
  }, [state]);

  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  const handleRemove = (user: User) => {
    setInvited(invited.filter(({ id }) => id !== user.id));
    setUsersToInvite([...usersToInvite, user]);
  };

  const handleInvite = (user: User) => {
    setUsersToInvite(invited.filter(({ id }) => id !== user.id));
    setInvited([...invited, user]);
  };

  const handleSubmit = async () => {
    setIsFetching(true);
    try {
      await axios.post('/api/tribes/invite');
      enqueueSnackbar('Invites Sent');
      onClose();
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
    setIsFetching(false);
  };

  const filteredUsers = matchSorter(usersToInvite, searchTerm, {
    keys: ['username', 'email'],
  });

  return (
    <Dialog
      fullWidth
      open
      confirmDisabled={invited.length === 0}
      confirmLabel={`Send Invites (${invited.length})`}
      isFetching={isFetching}
      maxWidth="md"
      onClose={onClose}
      onConfirm={handleSubmit}
    >
      <Query
        apiUrl="/api/tribes/invite"
        options={{
          onSuccess: ({ users }: { users: Array<User> }) =>
            setUsersToInvite(users),
        }}
      >
        {() => {
          return (
            <Box
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
                marginTop: '5rem',
              }}
            >
              <Box maxWidth="40.6rem">
                <Box
                  display="flex"
                  height={2.6}
                  justifyContent="space-between"
                  marginBottom={5}
                >
                  <Typography variant="h2">Invite to tribe</Typography>
                </Box>
                <Box className="card--rounded" padding={3}>
                  <Typography variant="body2">
                    CHOOSE SAPIENS TO INVITE
                  </Typography>
                  <Box marginTop={3}>
                    <DebounceSearch
                      fullWidth
                      placeholder="Search for tribe members"
                      style={{
                        backgroundColor: 'white',
                      }}
                      onSearch={handleSearch}
                    />
                  </Box>
                  <Box marginTop={3}>
                    <List aria-label="users to invite">
                      {filteredUsers.map((user) => (
                        <ListItem
                          key={user.id}
                          classes={{
                            container: classes.listItem,
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar alt={user.username}>
                              <Image
                                alt={user.username}
                                height={40}
                                src={user.avatar}
                                width={40}
                              />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={user.displayName}
                            secondary={`@${user.username}`}
                          />
                          <ListItemSecondaryAction
                            onClick={() => handleInvite(user)}
                          >
                            <Fab
                              aria-label="add user"
                              color="primary"
                              size="small"
                              style={{
                                width: '2.2rem',
                                height: '2.2rem',
                                minHeight: '2.2rem',
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </Fab>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Box>
              <Box maxWidth="40.6rem">
                <Box
                  alignItems="center"
                  bgcolor={background}
                  borderRadius="1rem"
                  display="flex"
                  height="4.6rem"
                  justifyContent="space-between"
                  marginBottom={3}
                  paddingLeft="1.6rem"
                  paddingRight="1rem"
                  width="100%"
                >
                  {link}
                  <Button
                    aria-label="copy url"
                    startIcon={<FileCopyIcon color="primary" />}
                    style={{
                      color: purple,
                    }}
                    onClick={() => copyToClipboard(link)}
                  >
                    Copy Link
                  </Button>
                </Box>
                <Box className="card--rounded" padding={3}>
                  {invited.length > 0 && (
                    <Typography variant="body2">
                      {invited.length} SAPIENS SELECTED
                    </Typography>
                  )}
                  <Box marginTop={3}>
                    <List aria-label="users selected to invite">
                      {invited.map((user) => (
                        <ListItem
                          key={user.id}
                          style={{ paddingRight: 0, paddingLeft: 0 }}
                        >
                          <ListItemAvatar>
                            <Avatar alt={user.username}>
                              <Image
                                alt={user.username}
                                height={40}
                                src={user.avatar}
                                width={40}
                              />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={user.displayName}
                            secondary={`@${user.username}`}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              aria-label="remove user"
                              onClick={() => handleRemove(user)}
                            >
                              <CloseIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        }}
      </Query>
    </Dialog>
  );
};

export default Invite;
