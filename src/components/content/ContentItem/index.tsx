import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

// api
import { createReply } from 'api/content';

// components
import Actions from './Actions';
import Header from './Header';
import { DeleteContent } from '../Modals';
import { CreateContentForm } from 'components/content';
import { PostComposerSkeleton } from 'components/common';

// mui
import { Box } from '@material-ui/core';

// context
import { useAuth } from 'context/user';

// utils
import { serialize } from 'utils/slate';

// types
import type { Content } from 'tools/types/content';

interface Props {
  content: Content;
  mutate: () => void;
}

enum Dialog {
  Delete,
}

const ContentItem = ({ content, mutate }: Props) => {
  const [dialog, setDialog] = useState<null | Dialog>(null);

  const { me } = useAuth();
  const { asPath, push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleReplySubmit = async (slateData) => {
    try {
      await createReply(content.id, {
        data: slateData.map((node: any) => serialize(node)).join(''),
      });

      enqueueSnackbar('Replied');

      push(`${asPath}/content/${content.id}`);
    } catch (err) {
      enqueueSnackbar(err.message);
    }
  };

  return (
    <Box
      className="card--rounded-white"
      display="grid"
      padding={3}
      style={{ gap: 22 }}
    >
      <Header content={content} onDelete={() => setDialog(Dialog.Delete)} />
      <div>
        <div dangerouslySetInnerHTML={{ __html: content.data }} />
      </div>

      <Actions commentsCount={0} echoCount={0} shareCount={0} />
      <Box borderColor="grey.100" borderTop={1} marginX={-3} />
      <Box>
        {me ? (
          <CreateContentForm user={me} onSubmit={handleReplySubmit} />
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
    </Box>
  );
};

export default ContentItem;
