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
  channelID: string;
}

const Channel = ({ channelID }: Props) => {
  return (
    <>
      <Page>
        <h1>TODO Channel Page: {channelID}</h1>
      </Page>
      <Widgets />
    </>
  );
};

const ChannelPage = () => {
  const { query } = useRouter();

  if (!query.channelID) return null;

  return (
    <Query api="/api/v3/profile/tribes" loader={<LayoutSkeleton />}>
      {() => <Channel channelID={String(query.channelID)} />}
    </Query>
  );
};

ChannelPage.Layout = LayoutWithWidgets;

export default ChannelPage;
