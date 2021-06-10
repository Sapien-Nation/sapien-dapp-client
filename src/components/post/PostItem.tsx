// mui
import { Avatar, Box, Chip, Typography, makeStyles } from '@material-ui/core';
import { ArrowRight, Public as Globe, Groups } from '@material-ui/icons';

// next
import Link from 'next/link';

// types
import type { Content } from 'tools/types/content';

// styles
import { blackLight, primary, purpleHighLight } from 'styles/colors';

// utils
import { formatTimestampToRelative } from 'utils/date';

const useStyles = makeStyles(() => ({
  chipRoot: {
    color: primary,
    backgroundColor: purpleHighLight,
  },
}));

interface Props {
  post: Content;
}

const PostCard = ({ post }: Props) => {
  const {
    createdAt,
    data,
    group: { name: groupName },
    image,
    owner: { avatar, displayName, userName },
    topics,
    tribe: { name: tribeName },
  } = post;
  const classes = useStyles();

  return (
    <div style={{ display: 'grid', gap: 22 }}>
      <Box alignItems="center" display="flex" justifyContent="space-between">
        <Box
          alignItems="center"
          display="flex"
          justifyContent="center"
          style={{ gap: 8 }}
        >
          <Avatar alt="Post Image" src={avatar} />
          <Link href="/">
            <a>
              <Typography>
                {displayName} @{userName}
              </Typography>
            </a>
          </Link>
          <ArrowRight />
          <Globe fontSize="small" />
          <Typography color={blackLight} marginRight={1}>
            {groupName}
          </Typography>
          <Chip
            classes={{
              root: classes.chipRoot,
            }}
            color="primary"
            icon={<Groups color="primary" />}
            label={tribeName}
            size="small"
          />
        </Box>

        {formatTimestampToRelative(createdAt)}
      </Box>

      <div>
        <div dangerouslySetInnerHTML={{ __html: data }} />
        <Box display="flex" style={{ gap: 5 }}>
          {topics.map((topic) => (
            <Link key={topic} href="/">
              <a>
                <Typography color="primary">#{topic}</Typography>
              </a>
            </Link>
          ))}
        </Box>
      </div>

      <img
        alt={tribeName}
        className="image--rounded"
        src={image}
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
};

export default PostCard;
