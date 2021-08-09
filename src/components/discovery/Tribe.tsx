// types
import type { Theme } from '@material-ui/core/styles';

// next
import Image from 'next/image';

// mui
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: '1.6rem',
    padding: theme.spacing(2.4),
    maxWidth: 341,
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

  return (
    <Card className={classes.root} elevation={0}>
      <Box>
        <div className={classes.mediaContainer}>
          <CardMedia
            className={classes.media}
            component="img"
            image={cover}
            title="Contemplative Reptile"
          />
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
        <Typography>{membersCount} Members</Typography>
        <Button color="primary" variant="contained">
          Join Tribe
        </Button>
      </CardActions>
    </Card>
  );
};

export default Tribe;
