import { useRouter } from 'next/router';

// components
import Layout from 'pages/Layout';
import { ContentDetailSkeleton, Page, Query } from 'components/common';
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
          loader={<ContentDetailSkeleton />}
          options={{
            fetcher: () =>
              mockContent({
                data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur scelerisque velit et orci pulvinar, ut viverra nibh pretium. Suspendisse ultrices nisi metus, eu suscipit magna commodo non. Donec consequat diam quis placerat accun fusce. Porttitor ante a interdum aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam consectetur bibendum turpis vitae suscipit. Nam eget lorem tempor, ornare mi vitae, tempus enim. Donec maximus tortor in dolor ullamcorper, in lacinia libero eleifend. Nam convallis quam lacus, non feugiat sapien sollicitudin quis. Donec lobortis varius orci non laoreet. Curabitur finibus dui vel sodales hendrerit. Aenean eu ligula mi. Nunc sagittis sapien id tellus efficitur maximus. Fusce risus libero, consequat sed sapien in, dapibus rutrum turpis. Nam pretium sapien non sem porttitor, et rhoncus enim accumsan. In lacus ipsum, bibendum at faucibus nec, fringilla a dolor. Proin sit amet enim vitae quam eleifend vulputate.',
              }),
          }}
        >
          {(content: ContentType) => (
            <ContentDetail content={content} mutate={() => {}} />
          )}
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
