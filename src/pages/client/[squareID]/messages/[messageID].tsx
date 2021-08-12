import { useRouter } from 'next/router';

// components
import {
  Page,
  Query,
  LayoutWithWidgets,
  LayoutSkeleton,
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
    <Query api="/api/v3/profile/tribes" loader={<LayoutSkeleton />}>
      {() => <Message messageID={String(query.messageID)} />}
    </Query>
  );
};

MessagePage.Layout = LayoutWithWidgets;

export default MessagePage;
