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
import { Box } from '@material-ui/core';

// types
import type { Content } from 'tools/types/content';

interface Props {
  content: Content;
  mutate: () => void;
}

const ContentItem = ({ content, mutate }: Props) => {
  const [dialog, setDialog] = useState(false);

  const { asPath } = useRouter();

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
            {sanitizeHtml(content.data, {
              allowedTags: ['b', 'i', 'em', 'strong', 'a'],
              allowedAttributes: {
                a: ['href'],
              },
            })?.substring(0, 250)}
          </a>
        </Link>
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
