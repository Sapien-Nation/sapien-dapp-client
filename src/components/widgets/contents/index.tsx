import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactHtmlParser from 'react-html-parser';

// components
import Actions from './Actions';
import Header from './Header';

// context
import { useAuth } from 'context/user';

// mui
import { Box, makeStyles, Typography } from '@material-ui/core';

// types
import type { Content } from 'tools/types/content';

// utils
import { getContentCount } from 'utils/contentCount';
import { html_substring } from 'utils/html';

interface Props {
  content: Content;
}

const useStyles = makeStyles(() => ({
  content: {
    '& p:first-child': {
      marginTop: '0 !important',
    },
  },
}));

const maxContentLength = 280;

const ContentItem = ({ content }: Props) => {
  const { me } = useAuth();
  const { asPath } = useRouter();
  const classes = useStyles();

  const showMore = getContentCount(content.body) > maxContentLength;

  const getHTML = () => {
    if (content.deletedAt) return '';

    return html_substring(content.body, maxContentLength);
  };

  return (
    <Box display="grid" style={{ gap: 10 }}>
      <Header content={content} variant="feed" onDelete={() => {}} />
      <div>
        <Link href={`${asPath}/content/${content.id}`}>
          <a className={classes.content}>
            {!content.deletedAt && (
              <Typography component="div" variant="h6">
                {ReactHtmlParser(getHTML())}
                {showMore && '...'}
              </Typography>
            )}
          </a>
        </Link>
      </div>
      <Actions content={content} user={me} />
    </Box>
  );
};

export default ContentItem;
