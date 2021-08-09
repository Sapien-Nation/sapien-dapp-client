import numeral from 'numeral';

//mui
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@material-ui/core';

// types
import type { CreatorWidget } from 'tools/types/widgets/creatorWidget';

const creators = [
  {
    avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
    displayName: 'Jonathan Doe',
    id: '124',
    username: 'jonniedoe',
    postCount: 1000,
  },
  {
    avatar: 'https://material-ui.com/static/images/avatar/2.jpg',
    displayName: 'Amanda Benson',
    id: '125',
    username: 'amandab',
    postCount: 15000,
  },
  {
    avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
    displayName: 'Leila Reed',
    id: '126',
    username: 'leilareed',
    postCount: 800,
  },
];

const TopCreators = () => {
  return (
    <List style={{ padding: 0 }}>
      {creators.map(
        ({ avatar, displayName, id, username, postCount }: CreatorWidget) => {
          return (
            <div key={id}>
              <ListItem disableGutters alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={displayName} src={avatar} />
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="button">{displayName}</Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        color="textSecondary"
                        display="block"
                        variant="overline"
                      >
                        @{username}
                      </Typography>
                    </>
                  }
                />
                <Tooltip
                  placement="top"
                  style={{ marginTop: '1rem' }}
                  title={`${postCount} posts`}
                >
                  <Typography align="right" variant="overline">
                    <Typography component="span" variant="h4">
                      {numeral(postCount).format('0a')}
                    </Typography>{' '}
                    posts
                  </Typography>
                </Tooltip>
              </ListItem>
            </div>
          );
        }
      )}
    </List>
  );
};

export default TopCreators;
