import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';

// components
import Actions from './Actions';
import Header from './Header';
import { DeleteContent } from '../Modals';
// import { ReplyForm } from 'components/reply';

// mui
import { Box, Typography } from '@material-ui/core';

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

const maxContentLength = 280;

const ContentItem = ({ content, mutate }: Props) => {
  const [view, setView] = useState(View.Compacted);
  const [dialog, setDialog] = useState(false);

  const { asPath } = useRouter();

  const showMore = getContentCount(content.data) > maxContentLength;

  const getHTML = () => {
    if (content.deletedAt) return '';

    return view === View.Compacted
      ? html_substring(content.data, maxContentLength)
      : content.data;
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
            {ReactHtmlParser(getHTML())}
            {showMore && view === View.Compacted && '...'}
            <Box marginTop={2.3}>
              {content.preview && (
                <img
                  alt="Preview"
                  src={content.preview}
                  style={{ borderRadius: '10px', maxWidth: '100%' }}
                />
              )}
            </Box>
          </a>
        </Link>{' '}
        {showMore && (
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
      <Actions />
      <Box borderColor="grey.100" borderTop={1} marginX={-3} />
      <Box>{/* <ReplyForm redirect contentID={content.id} />{' '} */}</Box>

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
