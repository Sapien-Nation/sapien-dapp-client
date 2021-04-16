import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { matchSorter } from 'match-sorter';

// next
import Image from 'next/image';

// types
import type { User } from 'tools/types/user';

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
  ListItemSecondaryAction,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Close as CloseIcon,
  FileCopy as FileCopyIcon,
} from '@material-ui/icons';

// components
import { DebounceSearch } from 'components/general';

const useStyles = makeStyles(() => ({
  listItem: {
    '&:hover': {
      borderRadius: '1rem',
      backgroundColor: 'rgba(143, 146, 161, 0.1)',
    },
  },
}));

interface Props {
  action: (invites: Array<User>) => Promise<any>;
  link?: string;
  title: string;
  users: Array<User>;
  subtitle?: string;
  onInvite: (count: number) => void;
}

export const formKey = 'invite-form';
const Invite = ({
  action,
  link,
  title,
  users,
  subtitle = 'SAPIENS SELECTED',
  onInvite,
}: Props) => {
  const classes = useStyles();
  const [invited, setInvited] = useState<Array<User>>([]);
  const [state, copyToClipboard] = useCopyToClipboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [usersToInvite, setUsersToInvite] = useState<Array<User>>(users);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (state.value) {
      enqueueSnackbar('Copied to clipboard');
    }
  }, [state]);

  useEffect(() => {
    onInvite(invited.length);
  }, [invited]);

  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (invited.length === 0) {
        enqueueSnackbar('Please select users to invite');
        return;
      }
      await action(invited);
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
  };

  const handleRemove = (user: User) => {
    const newInvites = invited.filter(({ id }) => id !== user.id);
    setInvited(newInvites);
    setUsersToInvite([...usersToInvite, user]);
  };

  const handleInvite = (user: User) => {
    const newInvites = invited.filter(({ id }) => id !== user.id);
    setUsersToInvite(newInvites);
    setInvited([...invited, user]);
  };

  const filteredUsers = matchSorter(usersToInvite, searchTerm, {
    keys: ['username', 'email'],
  });

  return (
    <form id={formKey} onSubmit={handleSubmit}>
      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
          marginTop: '5rem',
        }}
      >
        <Box maxWidth="40.6rem">
          <Box className="card--rounded" padding={3}>
            <Typography variant="body2">{title}</Typography>
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
                    <ListItemSecondaryAction onClick={() => handleInvite(user)}>
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
          {link && (
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
          )}
          <Box className="card--rounded" padding={3}>
            {invited.length > 0 && (
              <Typography variant="body2">
                {invited.length} {subtitle}
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
    </form>
  );
};

export default Invite;
