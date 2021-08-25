import { useRouter } from 'next/router';

// components
import { LayoutWithWidgets } from 'components/common';
import { Messages } from 'components/DirectMessages';

const MessagePage = () => {
  const { query } = useRouter();

  if (!query.messageID) return null;

  return <Messages messageID={String(query.messageID)} />;
};

MessagePage.Layout = LayoutWithWidgets;

export default MessagePage;
