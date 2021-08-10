import numeral from 'numeral';

// colors
import { neutral } from 'styles/colors';

// types
import type { Theme } from '@material-ui/core/styles';

// next
import Image from 'next/image';

// mui
import {
  Avatar,
  Box,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { FileCopy as FileCopyIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: '1.6rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2.4),
    maxWidth: 341,
  },
  badge: {
    width: '100%',
  },
  badgeContent: {
    backgroundColor: neutral[50],
    border: '3px solid #fff',
    borderRadius: 16,
    marginRight: '9.5rem',
    padding: 6,
  },
  media: {
    borderRadius: '1rem',
    height: '11.3rem',
  },
  mediaContainer: {
    position: 'relative',
  },
  avatar: {
    width: '7.2rem',
    height: '7.2rem',
    borderRadius: '1.6rem',
    border: `3px solid ${theme.palette.common.white}`,
    position: 'absolute',
    bottom: '-1.6rem',
    left: '1.8rem',
  },
  content: {
    padding: '3rem 1rem 0 1rem',
  },
  description: {
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 3,
    overflow: 'hidden',
  },
  action: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

interface Props {
  tribe: any;
}

const Tribe = ({
  tribe: { avatar, cover, description, name, membersCount },
}: Props) => {
  const classes = useStyles();
  const isFollowing = true;
  const price = 1200;

  return (
    <Card className={classes.root} elevation={0}>
      <Box>
        <div className={classes.mediaContainer}>
          <Badge
            badgeContent={
              <span className={classes.badgeContent}>
                {numeral(price).format('$0.00')}
              </span>
            }
            className={classes.badge}
          >
            <CardMedia
              className={classes.media}
              component="img"
              image={cover}
              title="Contemplative Reptile"
            />
          </Badge>
          <Avatar alt="Tribe Name" className={classes.avatar} variant="rounded">
            <Image alt="Tribe name" height={72} src={avatar} width={72} />
          </Avatar>
        </div>
        <CardContent className={classes.content}>
          <Box display="grid" style={{ gap: '24px' }}>
            <Typography>{name}</Typography>
            <Typography
              className={classes.description}
              color="textSecondary"
              style={{ lineHeight: '24px' }}
            >
              {description}
            </Typography>
          </Box>
        </CardContent>
      </Box>
      <CardActions className={classes.action}>
        <Typography variant="overline">
          {numeral(membersCount).format('0a')} Members
        </Typography>
        {isFollowing ? (
          <ButtonGroup disableElevation color="primary" variant="contained">
            <Button>Invite</Button>
            <Button>
              <FileCopyIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        ) : (
          <Button color="primary" variant="contained">
            Join Tribe
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Tribe;
