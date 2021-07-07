import { useState } from 'react';

// components
import Actions from './Actions';
import Header from './Header';
import { DeleteContent, EditContent } from '../Modals';
import { PostComposerSkeleton } from 'components/common';
import { CreateContentForm } from 'components/content';

// mui
import { Box } from '@material-ui/core';

// context
import { useAuth } from 'context/user';

// types
import type { Content } from 'tools/types/content';

interface Props {
  content: Content;
  mutate: () => void;
}

enum Dialog {
  Edit,
  Delete,
}

const ContentItem = ({ content, mutate }: Props) => {
  const [dialog, setDialog] = useState<null | Dialog>(null);
  const { me } = useAuth();

  return (
    <Box
      className="card--rounded-white"
      display="grid"
      padding={3}
      style={{ gap: 22 }}
    >
      <Header
        content={content}
        onDelete={() => setDialog(Dialog.Delete)}
        onEdit={() => setDialog(Dialog.Edit)}
      />
      <div>
        <div dangerouslySetInnerHTML={{ __html: content.data }} />
      </div>

      <Actions commentsCount={0} echoCount={0} shareCount={0} />
      <Box borderColor="grey.100" borderTop={1} marginX={-3} />
      <Box>
        {me ? (
          <CreateContentForm user={me} onSubmit={() => {}} />
        ) : (
          <PostComposerSkeleton />
        )}
      </Box>

      {dialog === Dialog.Delete && (
        <DeleteContent
          contentID={content.id}
          onCancel={() => setDialog(null)}
          onDelete={() => mutate()}
        />
      )}

      {dialog === Dialog.Edit && (
        <EditContent
          content={content}
          onCancel={() => setDialog(null)}
          onEdit={() => mutate()}
        />
      )}
    </Box>
  );
};

export default ContentItem;
