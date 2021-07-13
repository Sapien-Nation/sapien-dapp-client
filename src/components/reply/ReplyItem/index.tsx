import { useState } from 'react';

// components
import Header from './Header';
import { DeleteReply } from '../Modals';

// mui
import { Box } from '@material-ui/core';

// types
import type { Content } from 'tools/types/content';

interface Props {
  reply: Content;
  mutate: () => void;
}

enum Dialog {
  Delete,
}

const ReplyItem = ({ reply, mutate }: Props) => {
  const [dialog, setDialog] = useState<null | Dialog>(null);

  return (
    <Box
      className="card--rounded-white"
      display="grid"
      padding={3}
      style={{ gap: 22 }}
    >
      <Header reply={reply} onDelete={() => setDialog(Dialog.Delete)} />
      <div dangerouslySetInnerHTML={{ __html: reply.data }} />

      {dialog === Dialog.Delete && (
        <DeleteReply
          replyID={reply.id}
          onCancel={() => setDialog(null)}
          onDelete={() => mutate()}
        />
      )}
    </Box>
  );
};

export default ReplyItem;
