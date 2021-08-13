import { useRouter } from 'next/router';

// components
import {
  Page,
  LayoutWithWidgets,
} from 'components/common';
import { Widgets } from 'components/widgets';

interface Props {
  messageID: string;
}

const Message = ({ messageID }: Props) => {
  return (
    <>
      <Page>
        <h1>TODO Message Page: {messageID}</h1>
      </Page>
      <Widgets />
    </>
  );
};

const MessagePage = () => {
  const { query } = useRouter();

  if (!query.messageID) return null;

  return (
    <Message messageID={String(query.messageID)} /> <Message messageID={String(query.messageID)} />
  );
};

MessagePage.Layout = LayoutWithWidgets;

export default MessagePage;
