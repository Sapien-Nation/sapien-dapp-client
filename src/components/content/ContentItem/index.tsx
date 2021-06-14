// components
import Actions from './Actions';
import Header from './Header';

// mui
import { Box, Typography } from '@material-ui/core';

// next
import Link from 'next/link';

// types
import type { Content } from 'tools/types/content';

interface Props {
  content: Content;
}

const ContentItem = ({ content }: Props) => {
  return (
    <div style={{ display: 'grid', gap: 22 }}>
      <Header
        createdAt={content.createdAt}
        groupName={content.group.name}
        owner={content.owner}
        tribeName={content.tribe.name}
      />
      <div>
        <div dangerouslySetInnerHTML={{ __html: content.data }} />
        <Box display="flex" style={{ gap: 5 }}>
          {content.topics.map((topic) => (
            <Link key={topic} href="/">
              <a>
                <Typography color="primary">#{topic}</Typography>
              </a>
            </Link>
          ))}
        </Box>
      </div>

      <img
        alt={content.tribe.name}
        className="image--rounded"
        src={content.image}
        style={{ width: '100%', maxHeight: '26rem', objectFit: 'cover' }}
      />
      <Actions commentsCount={0} echoCount={0} />
    </div>
  );
};

export default ContentItem;
