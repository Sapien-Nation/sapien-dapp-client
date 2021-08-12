// components
import { Layout, LayoutSkeleton, Redirect, Query } from 'components/common';

const IndexPage = () => (
  <Query api="/api/v3/profile/tribes" loader={<LayoutSkeleton />}>
    {() => <Redirect to="/client/sapien" />}
  </Query>
);

IndexPage.Layout = Layout;

export default IndexPage;
