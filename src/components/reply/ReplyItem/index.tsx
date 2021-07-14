import { useState } from 'react';

// components
import Header from './Header';
import Actions from './Actions';
import ReplyForm from './ReplyForm';
import { DeleteReply } from '../Modals';

// mui
import { Box } from '@material-ui/core';

// context
import { useAuth } from 'context/user';

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
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);

  const { me } = useAuth();

  return (
    <Box
      className="card--rounded-white"
      display="grid"
      padding={3}
      style={{ gap: 22 }}
    >
      <Header reply={reply} onDelete={() => setDialog(Dialog.Delete)} />
      <div dangerouslySetInnerHTML={{ __html: reply.data }} />
      <Actions toggleReply={() => setShowReplyForm(!showReplyForm)} />
      {me && showReplyForm ? (
        <>
          <Box borderColor="grey.100" borderTop={1} marginX={-3} />
          <div>
            <ReplyForm />
          </div>
        </>
      ) : null}
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
