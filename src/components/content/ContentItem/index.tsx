import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';

// components
import Actions from './Actions';
import Header from './Header';
import { DeleteContent } from '../Modals';
import { ReplyForm } from 'components/reply';

// context
import { useAuth } from 'context/user';

// mui
import { Box, Typography, makeStyles } from '@material-ui/core';

// types
import type { Content } from 'tools/types/content';

// utils
import { getContentCount } from 'utils/contentCount';
import { html_substring } from 'utils/html';

interface Props {
  content: Content;
  mutate: () => void;
}

enum View {
  Compacted,
  Expanded,
}

const useStyles = makeStyles(() => ({
  content: {
    '& p:first-child': {
      marginTop: '0 !important',
    },
  },
}));

const maxContentLength = 280;

const ContentItem = ({ content, mutate }: Props) => {
  const [view, setView] = useState(View.Compacted);
  const [dialog, setDialog] = useState(false);

  const { me } = useAuth();
  const { asPath } = useRouter();
  const classes = useStyles();

  const showMore = getContentCount(content.body) > maxContentLength;

  const getHTML = () => {
    if (content.deletedAt) return '';

    return view === View.Compacted
      ? html_substring(content.body, maxContentLength)
      : content.body;
  };

  return (
    <Box
      className="card--rounded-white"
      display="grid"
      padding={3}
      style={{ gap: 22 }}
    >
      <Header
        content={content}
        variant="feed"
        onDelete={() => setDialog(true)}
      />
      <div>
        <Link href={`${asPath}/content/${content.id}`}>
          <a className={classes.content}>
            {!content.deletedAt && (
              <Typography component="div" variant="h6">
                {ReactHtmlParser(getHTML())}
                {showMore && view === View.Compacted && '...'}
                {/* <Box marginTop={2.3}>
                  {content.imagePreview && (
                    <img
                      alt="Preview"
                      src={content.imagePreview}
                      style={{ borderRadius: '10px', maxWidth: '100%' }}
                    />
                  )}
                </Box> */}
              </Typography>
            )}
          </a>
        </Link>{' '}
        {showMore && !content.deletedAt && (
          <Typography
            color="primary"
            component="span"
            style={{ cursor: 'pointer' }}
            variant="body2"
            onClick={() => {
              setView(view === View.Compacted ? View.Expanded : View.Compacted);
            }}
          >
            {view === View.Compacted ? 'See More' : 'See Less'}
          </Typography>
        )}
      </div>
      <Actions content={content} user={me} />

      {!content.deletedAt && me && (
        <>
          <Box borderColor="grey.100" borderTop={1} marginX={-3} />
          <Box>
            <ReplyForm redirect contentID={content.id} />
          </Box>
        </>
      )}

      {dialog && (
        <DeleteContent
          contentID={content.id}
          onCancel={() => setDialog(false)}
          onDelete={() => {
            mutate();
            setDialog(false);
          }}
        />
      )}
    </Box>
  );
};

export default ContentItem;
