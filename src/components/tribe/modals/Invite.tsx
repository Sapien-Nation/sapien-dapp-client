import { matchSorter } from 'match-sorter';
import { useEffect, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { useSnackbar } from 'notistack';

// types
import { User } from 'tools/types/user';

// api
import axios from 'api';

// next
import Image from 'next/image';

// mui
import {
  Avatar,
  Box,
  Fab,
  IconButton,
  Typography,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
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

const Invite = ({ link, onClose }: Props) => {
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

  const apiUrl = '/api/tribes/invite';
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(apiUrl);
      return data;
    } catch (err) {
      enqueueSnackbar(err.message);
    }
  };

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
      // TODO make call
      enqueueSnackbar('Invites Sent');
      onClose();
    } catch (err) {
      enqueueSnackbar(err.message);
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
      maxWidth="lg"
      title={
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="h1">Invite friends to tribe</Typography>
          <Box
            alignItems="center"
            className="card--rounded"
            display="flex"
            justifyContent="space-between"
            padding={1.7}
            width={350}
          >
            {link}
            <IconButton
              aria-label="copy url"
              onClick={() => copyToClipboard(link)}
            >
              <FileCopyIcon color="primary" />
            </IconButton>
          </Box>
        </Box>
      }
      onClose={onClose}
      onConfirm={handleSubmit}
    >
      <Query
        apiUrl={apiUrl}
        options={{
          fetcher: fetchUsers,
          onSuccess: ({ users }: { users: Array<User> }) => {
            setUsersToInvite(users);
          },
        }}
      >
        {() => {
          return (
            <Box
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
              }}
            >
              <Box className="card--rounded" padding={2.4} paddingTop={3}>
                <Typography variant="body2">
                  CHOOSE SAPIENS TO INVITE
                </Typography>
                <Box marginTop={3}>
                  <DebounceSearch
                    fullWidth
                    placeholder="Search for tribe members"
                    onSearch={handleSearch}
                  />
                </Box>
                <Box marginTop={3}>
                  <List aria-label="users to invite">
                    {filteredUsers.map((user) => (
                      <ListItem key={user.id}>
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
                          primary={user.email}
                          secondary={`@${user.username}`}
                        />
                        <ListItemSecondaryAction
                          onClick={() => handleInvite(user)}
                        >
                          <Fab
                            aria-label="add user"
                            color="primary"
                            size="small"
                          >
                            <AddIcon />
                          </Fab>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
              <Box className="card--rounded" padding={2.4} paddingTop={3}>
                {invited.length > 0 && (
                  <Typography variant="body2">
                    {invited.length} SAPIENS SELECTED
                  </Typography>
                )}
                <Box marginTop={3}>
                  <List aria-label="users selected to invite">
                    {invited.map((user) => (
                      <ListItem key={user.id}>
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
                          primary={user.email}
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
          );
        }}
      </Query>
    </Dialog>
  );
};

export default Invite;
