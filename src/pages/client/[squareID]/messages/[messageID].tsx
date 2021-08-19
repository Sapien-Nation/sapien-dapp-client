import { useRouter } from 'next/router';
import { useEffect } from 'react';

// components
import { LayoutWithWidgets } from 'components/common';
import { Messages } from 'components/DirectMessages';

// context
import { useAuth } from 'context/user';

const MessagePage = () => {
  const { push, query } = useRouter();
  const { me } = useAuth();

  useEffect(() => {
    if (me === null) {
      push('/register');
    }
  }, [me, push]);

  if (!query.messageID) return null;

  return <Messages messageID={String(query.messageID)} />;
};

MessagePage.Layout = LayoutWithWidgets;

export default MessagePage;
