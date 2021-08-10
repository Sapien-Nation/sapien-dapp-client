import { useState } from 'react';
import { mutate } from 'swr';
import ReactHtmlParser from 'react-html-parser';

// components
import Header from './Header';
import Actions from './Actions';
import { DeleteReply } from '../Modals';

// mui
import { Box, Typography } from '@material-ui/core';

// types
import type { Content } from 'tools/types/content';

// utils
import { getContentCount } from 'utils/contentCount';
import { html_substring } from 'utils/html';

interface Props {
  apiUrl: string;
  reply: Content;
}

enum Dialog {
  Delete,
}

enum View {
  Compacted,
  Expanded,
}

const maxReplyLength = 140;

const ReplyItem = ({ apiUrl, reply }: Props) => {
  const [view, setView] = useState(View.Compacted);
  const [dialog, setDialog] = useState<null | Dialog>(null);

  const showMore = getContentCount(reply.body) > maxReplyLength;

  const getHTML = () => {
    if (reply.deletedAt) return '';

    return view === View.Compacted
      ? html_substring(reply.body, maxReplyLength)
      : reply.body;
  };

  return (
    <Box
      className="card--rounded-white"
      display="grid"
      padding={3}
      style={{ gap: 22 }}
    >
      <Header reply={reply} onDelete={() => setDialog(Dialog.Delete)} />
      {ReactHtmlParser(getHTML())}
      {showMore && view === View.Compacted && '...'}
      {showMore && (
        <Typography
          color="primary"
          component="span"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setView(view === View.Compacted ? View.Expanded : View.Compacted);
          }}
        >
          {view === View.Compacted ? ' See More' : ' See Less'}
        </Typography>
      )}
      <Actions />

      {dialog === Dialog.Delete && (
        <DeleteReply
          replyID={reply.id}
          onCancel={() => setDialog(null)}
          onDelete={() => {
            setDialog(null);
            mutate(
              apiUrl,
              (replies: Array<Content>) =>
                replies.filter(({ id }) => id !== reply.id),
              false
            );
          }}
        />
      )}
    </Box>
  );
};

export default ReplyItem;
