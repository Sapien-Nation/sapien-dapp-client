import Link from 'next/link';

// components
import Actions from './Actions';
import Header from './Header';

// mui
import { Box, Typography } from '@material-ui/core';

// types
import type { Content } from 'tools/types/content';

interface Props {
  content: Content;
}

const ContentItem = ({ content }: Props) => {
  return (
    <Box
      className="card--rounded-white"
      display="grid"
      paddingX={1.5}
      paddingY={3.6}
      style={{ gap: 22 }}
    >
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

      <Actions commentsCount={0} echoCount={0} shareCount={0} />
    </Box>
  );
};

export default ContentItem;
