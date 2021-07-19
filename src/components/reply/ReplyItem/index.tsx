import { useState } from 'react';
import { mutate } from 'swr';

// components
import Header from './Header';
import Actions from './Actions';
import { DeleteReply } from '../Modals';

// mui
import { Box } from '@material-ui/core';

// types
import type { Content } from 'tools/types/content';

interface Props {
  apiUrl: string;
  reply: Content;
}

enum Dialog {
  Delete,
}

const ReplyItem = ({ apiUrl, reply }: Props) => {
  // TODO only show when reply.data length >140
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
      <Actions />
      {dialog === Dialog.Delete && (
        <DeleteReply
          replyID={reply.id}
          onCancel={() => setDialog(null)}
          onDelete={() => {
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
