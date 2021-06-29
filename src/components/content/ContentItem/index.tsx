import { useState } from 'react';

// components
import Actions from './Actions';
import Header from './Header';
import { DeleteContent } from '../Modals';

// mui
import { Box } from '@material-ui/core';

// types
import type { Content } from 'tools/types/content';

interface Props {
  content: Content;
  mutate: () => void;
}

const ContentItem = ({ content, mutate }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <Box
      className="card--rounded-white"
      display="grid"
      paddingX={1.5}
      paddingY={3.6}
      style={{ gap: 22 }}
    >
      <Header
        content={content}
        onDelete={() => setShowDeleteModal(true)}
        onEdit={() => {}}
      />
      <div>
        <div dangerouslySetInnerHTML={{ __html: content.data }} />
      </div>

      <Actions commentsCount={0} echoCount={0} shareCount={0} />

      {showDeleteModal && (
        <DeleteContent
          contentID={content.id}
          onCancel={() => setShowDeleteModal(false)}
          onDelete={() => mutate()}
        />
      )}
    </Box>
  );
};

export default ContentItem;
