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
  message: Content;
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

const maxMessageLength = 280;

const MessageItem = ({ message, mutate }: Props) => {
  const [view, setView] = useState(View.Compacted);
  const [dialog, setDialog] = useState(false);

  const { me } = useAuth();
  const { asPath } = useRouter();
  const classes = useStyles();

  const showMore = getContentCount(message.body) > maxMessageLength;

  const getHTML = () => {
    if (message.deletedAt) return '';

    return view === View.Compacted
      ? html_substring(message.body, maxMessageLength)
      : message.body;
  };

  return (
    <Box
      className="card--rounded-white"
      display="grid"
      padding={3}
      style={{ gap: 22 }}
    >
      <Header
        content={message}
        variant="feed"
        onDelete={() => setDialog(true)}
      />
      <div>
        <Link href={`${asPath}/content/${message.id}`}>
          <a className={classes.content}>
            {!message.deletedAt && (
              <Typography component="div" variant="h6">
                {ReactHtmlParser(getHTML())}
                {showMore && view === View.Compacted && '...'}
              </Typography>
            )}
          </a>
        </Link>{' '}
        {showMore && !message.deletedAt && (
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
      <Actions content={message} user={me} />

      {!message.deletedAt && me && (
        <>
          <Box borderColor="grey.100" borderTop={1} marginX={-3} />
          <Box>
            <ReplyForm redirect contentID={message.id} />
          </Box>
        </>
      )}

      {dialog && (
        <DeleteContent
          contentID={message.id}
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

export default MessageItem;
