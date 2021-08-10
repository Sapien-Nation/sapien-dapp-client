import Link from 'next/link';
import { useRouter } from 'next/router';

// mui
import {
  Avatar,
  Box,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';

// styles
import { primary } from 'styles/colors';

// types
import type { Content } from 'tools/types/content';

// utils
import { formatTimestampToRelative } from 'utils/date';

const useStyles = makeStyles(() => ({
  chipRoot: {
    color: primary[800],
    backgroundColor: primary[100],
    padding: '0.2rem 0.8rem',
    borderRadius: '9rem',
    fontSize: '1.2rem',
    height: '100%',
    fontWeight: 'bold',
  },
  avatar: {
    width: '3.2rem',
    height: '3.2rem',
  },
}));

interface Props {
  content: Content;
  variant: 'detail' | 'feed';
  onDelete: () => void;
}

const Header = ({ content, variant }: Props) => {
  const classes = useStyles();

  const { author, createdAt, deletedAt } = content;
  const { asPath } = useRouter();

  return (
    <>
      <Box alignItems="center" display="flex" justifyContent="space-between">
        <Box
          alignItems="center"
          display="flex"
          flexWrap="wrap"
          style={{ gap: 8 }}
        >
          {deletedAt ? (
            <>
              <Link
                passHref
                href={
                  variant === 'detail'
                    ? asPath
                    : `${asPath}/content/${content.id}`
                }
              >
                <Typography color="textSecondary" component="a" variant="h6">
                  This post was removed by the owner
                </Typography>
              </Link>
              <Divider flexItem light orientation="vertical" />
            </>
          ) : (
            <>
              <Avatar
                alt="Tribe Image"
                className={classes.avatar}
                src={author.avatar}
              >
                {author.displayName?.[0].toUpperCase()}
              </Avatar>
              <Link href="/">
                <a>
                  <Typography component="span" variant="button">
                    {author.displayName}
                  </Typography>
                </a>
              </Link>
            </>
          )}
        </Box>

        <Box alignItems="center" display="flex" justifyContent="flex-end">
          <Typography color="textSecondary" component="span" variant="h6">
            {formatTimestampToRelative(createdAt)}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Header;
