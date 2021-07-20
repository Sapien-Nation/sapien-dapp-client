import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import sanitizeHtml from 'sanitize-html';

// components
import Actions from './Actions';
import Header from './Header';
import { DeleteContent } from '../Modals';
import { ReplyForm } from 'components/reply';

// mui
import { Box, Typography } from '@material-ui/core';

// types
import type { Content } from 'tools/types/content';

// utils
import { getContentCount } from 'utils/contentCount';

interface Props {
  content: Content;
  mutate: () => void;
}

enum View {
  Compacted,
  Expanded,
}

const maxContentLength = 280;

const ContentItem = ({ content, mutate }: Props) => {
  const [view, setView] = useState(View.Compacted);
  const [dialog, setDialog] = useState(false);

  const { asPath } = useRouter();

  const showMore = getContentCount(content.data) > maxContentLength;

  const getHTML = () => {
    if (content.deletedAt) return '';

    let html = sanitizeHtml(content.data, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a'],
      allowedAttributes: {
        a: ['href'],
      },
    });

    if (view === View.Compacted) {
      html = html.substring(0, maxContentLength);
    }

    return html;
  };

  return (
    <Box
      className="card--rounded-white"
      display="grid"
      padding={3}
      style={{ gap: 22 }}
    >
      <Header content={content} onDelete={() => setDialog(true)} />
      <div>
        <Link href={`${asPath}/content/${content.id}`}>
          <a>
            {getHTML()}
            {showMore && view === View.Compacted && '...'}
          </a>
        </Link>{' '}
        {showMore && (
          <Typography
            color="primary"
            component="span"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setView(view === View.Compacted ? View.Expanded : View.Compacted);
            }}
          >
            {view === View.Compacted ? 'See More' : 'See Less'}
          </Typography>
        )}
      </div>
      <Actions />
      <Box borderColor="grey.100" borderTop={1} marginX={-3} />
      <Box>
        <ReplyForm redirect contentID={content.id} />
      </Box>

      {dialog && (
        <DeleteContent
          contentID={content.id}
          onCancel={() => setDialog(false)}
          onDelete={() => mutate()}
        />
      )}
    </Box>
  );
};

export default ContentItem;
