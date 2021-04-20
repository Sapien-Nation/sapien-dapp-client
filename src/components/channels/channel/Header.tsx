// types
import type { Channel } from 'tools/types/channel';

// next
import Image from 'next/image';

// mui
import {
  Avatar,
  Box,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  cover: {
    borderRadius: '1.2rem',
  },
}));

interface Props {
  channel: Channel;
}

const Header = ({
  channel: { cover, description, image, name, membersCount },
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box
      style={{
        borderRadius: '1.6rem',
        padding: theme.spacing(0.8),
        background: theme.palette.common.white,
      }}
    >
      <Box>
        <div
          style={{
            position: 'relative',
            height: '20rem',
          }}
        >
          <Image
            alt={`${name} cover photo`}
            className={classes.cover}
            layout="fill"
            objectFit="cover"
            src={cover}
          />
        </div>
        <Box
          paddingX={3}
          style={{
            top: '-2.5rem',
            position: 'relative',
          }}
        >
          <Box
            alignItems="flex-end"
            display="flex"
            flexDirection="row"
            marginBottom={3}
          >
            <Avatar
              alt="Tribe Name"
              style={{
                width: '11.1rem',
                height: '11.1rem',
                borderRadius: '1.6rem',
                border: `3px solid ${theme.palette.common.white}`,
              }}
              variant="rounded"
            >
              <Image alt="Tribe name" height={110} src={image} width={110} />
            </Avatar>
            <Box marginLeft={3}>
              <Typography gutterBottom variant="h2">
                {name}
              </Typography>
              <Typography component="span">{membersCount} Members</Typography>
            </Box>
          </Box>
          <Typography color="textSecondary" variant="body1">
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
