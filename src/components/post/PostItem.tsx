// mui
import { Avatar, Box, Chip, Typography, makeStyles } from '@material-ui/core';
import { ArrowRight, Public as Globe, Groups } from '@material-ui/icons';

// next
import Image from 'next/image';
import Link from 'next/link';

// types
import type { Content } from 'tools/types/content';

// styles
import {
  black,
  blackLight,
  darkGrey,
  purple,
  purpleHighLight,
  white,
} from 'styles/colors';

// utils
import { formatTimestampToRelative } from 'utils/date';

const useStyles = makeStyles(() => ({
  chipLabel: {
    color: purple,
    fontWeight: 600,
  },
  chipRoot: {
    color: purple,
    paddingLeft: '1rem',
    background: purpleHighLight,
  },
  chipIcon: {
    color: `${purple} !important`,
    fontSize: '2rem',
  },
}));

interface Props {
  post: Content;
}

const PostCard = ({
  post: {
    data,
    group: { name: groupName },
    createdAt,
    image,
    owner: { avatar, displayName, userName },
    topics,
    tribe: { name: tribeName },
  },
}: Props) => {
  const classes = useStyles();

  return (
    <Box
      bgcolor={white}
      borderRadius={1.6}
      data-testid="post-card"
      padding={1.5}
    >
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        padding={1}
      >
        <Box alignItems="center" display="flex">
          <Link passHref href="/">
            <a style={{ alignItems: 'center', color: black, display: 'flex' }}>
              <Avatar
                alt="Post Image"
                style={{
                  width: '3.2rem',
                  height: '3.2rem',
                  borderRadius: '3.2rem',
                }}
                variant="rounded"
              >
                <Image alt={tribeName} height={110} src={avatar} width={110} />
              </Avatar>
              <Typography marginX={1} variant="buttonMedium">
                {displayName}
              </Typography>
              <Typography color={darkGrey} variant="buttonMedium">
                @{userName}
              </Typography>
            </a>
          </Link>
          <ArrowRight htmlColor={darkGrey} />
          <Box lineHeight={0} marginLeft={1} marginRight={0.5}>
            <Globe htmlColor={darkGrey} sx={{ fontSize: '1.6rem' }} />
          </Box>
          <Typography color={blackLight} marginRight={1} variant="buttonMedium">
            {groupName}
          </Typography>
          <Chip
            classes={{
              root: classes.chipRoot,
              label: classes.chipLabel,
              icon: classes.chipIcon,
            }}
            icon={<Groups />}
            label={tribeName}
          />
        </Box>
        <Typography color={darkGrey} marginRight={1} variant="body4">
          {formatTimestampToRelative(createdAt)}
        </Typography>
      </Box>
      <Box padding={1}>
        <div dangerouslySetInnerHTML={{ __html: data }} />
        <br />
        {topics.map((topic) => (
          <Link key={topic} passHref href="/">
            <a>
              <Typography color="primary" marginRight={0.5} variant="body4">
                #{topic}
              </Typography>
            </a>
          </Link>
        ))}
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
