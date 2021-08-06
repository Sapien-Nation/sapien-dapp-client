// components
import { Layout, Redirect, Query } from 'components/common';

const IndexPage = () => (
  <Query api="/api/v3/profile/tribes" loader={null}>
    {() => <Redirect to="/client/sapien" />}
  </Query>
);

IndexPage.Layout = Layout;

export default IndexPage;
