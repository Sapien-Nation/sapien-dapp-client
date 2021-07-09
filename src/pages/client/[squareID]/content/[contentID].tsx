import { useRouter } from 'next/router';

// components
import Layout from 'pages/Layout';
import { Page, Query } from 'components/common';
import { ContentDetail } from 'components/content';

// types
import type { Content as ContentType } from 'tools/types/content';

// mocks
import { mockContent } from 'tools/mocks/content';

interface Props {
  contentID: string;
}

const Content = ({ contentID }: Props) => {
  console.log(contentID);
  return (
    <Page>
      <>
        <Query
          api={`/post/${contentID}`}
          options={{ fetcher: () => mockContent() }}
        >
          {(content: ContentType) => <ContentDetail content={content} />}
        </Query>
        {/* <Query api={`/post/${contentID}/replies`}>
          {(content: Array<ContentType>) => <h1>'TODO Reply feed'</h1>}
        </Query> */}
      </>
    </Page>
  );
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
