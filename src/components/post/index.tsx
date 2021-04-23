import { useState } from 'react';

// mui
import {
  Avatar,
  Box,
  Chip,
  Typography,
  makeStyles,
  IconButton,
  Popover,
} from '@material-ui/core';

// next
import Image from 'next/image';

// assets
import {
  MultipleBadges,
  NextArrow,
  Globe,
  ThreeDots,
} from 'components/common/assets/svg';

import { Community } from './assets/svg';

// types
import type { Post } from 'tools/types/post';

// styles
import { purple, white } from 'styles/colors';

// utils
import { formatTimestampToRelative } from 'utils/date';

const useStyles = makeStyles(() => ({
  chipLabel: {
    color: purple,
    fontWeight: 600,
  },
  chipRoot: {
    paddingLeft: '1rem',
  },
  popoverPaper: () => ({
    height: '10rem',
    padding: '1.6rem',
    boxShadow: '-20px 0px 40px rgb(51 51 51 / 10%)',
    borderRadius: '1.6rem',
  }),
}));

interface Props {
  post: Post;
}

const PostCard = ({
  post: {
    body,
    channel: { name: channelName },
    createdAt,
    image,
    owner: { avatar, displayName, username },
    topics,
    tribe: { name: tribeName },
  },
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isOptionsOpen, toggleOptions] = useState<boolean>(false);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    toggleOptions(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    toggleOptions(false);
  };

  const isOpen = Boolean(anchorEl);

  return (
    <Box bgcolor={white} borderRadius={1.6} padding={1.5}>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        padding={1}
      >
        <Box alignItems="center" display="flex">
          <Avatar
            alt="Tribe Name"
            style={{
              width: '3.2rem',
              height: '3.2rem',
              borderRadius: '3.2rem',
            }}
            variant="rounded"
          >
            <Image alt="Tribe name" height={110} src={avatar} width={110} />
          </Avatar>
          <Typography marginLeft={1} marginRight={1} variant="buttonMedium">
            {displayName}
          </Typography>
          <Typography color="info" variant="buttonMedium">
            @{username}
          </Typography>
          <Box lineHeight={0} marginX={1}>
            <MultipleBadges />
          </Box>
          <NextArrow />
          <Box lineHeight={0} marginX={1}>
            <Globe />
          </Box>
          <Typography marginRight={1} variant="buttonMedium">
            {channelName}
          </Typography>
          <Chip
            classes={{
              root: classes.chipRoot,
              label: classes.chipLabel,
            }}
            color="secondary"
            icon={<Community />}
            label={tribeName}
          />
        </Box>
        <Box alignItems="center" display="flex">
          <Typography color="info" marginRight={1} variant="body4">
            {formatTimestampToRelative(createdAt)}
          </Typography>
          <IconButton onClick={handleClick}>
            <ThreeDots />
          </IconButton>
          <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            classes={{ paper: classes.popoverPaper }}
            id={isOpen ? 'options-menu' : undefined}
            open={isOptionsOpen}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            onClose={handleClose}
          >
            Options
          </Popover>
        </Box>
      </Box>
      <Box padding={1}>
        <div dangerouslySetInnerHTML={{ __html: body }} />
        <br />
        <Typography color="primary" variant="body4">
          #{topics[0]}
        </Typography>
      </Box>
      <Box borderRadius={10} height={200} position="relative">
        <Image
          alt={tribeName}
          className="image--rounded"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          src={image}
        />
      </Box>
    </Box>
  );
};

export default PostCard;
