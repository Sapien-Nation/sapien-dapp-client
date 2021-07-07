import { useRouter } from 'next/router';

// components
import Layout from 'pages/Layout';
import { Query } from 'components/common';

interface Props {
  contentID: string;
}

const Content = ({ contentID }: Props) => {
  console.log(contentID);
  return <h1>TODO Content Page</h1>;
};

const ContentPage = () => {
  const { query } = useRouter();

  if (!query.contentID) return null;

  return (
    <Query api="/api/v3/profile/tribes">
      {() => <Content contentID={String(query.contentID)} />}
    </Query>
  );
};

ContentPage.Layout = Layout;

export default ContentPage;
