import { useState } from 'react';
import { useRouter } from 'next/router';

// components
import Header from 'components/content/ContentItem/Header';
import ReplyForm from 'components/reply/ReplyForm';
import { DeleteContent } from 'components/content/Modals';
import { ContentDetailSkeleton, Query } from 'components/common';

// types
import type { Content as ContentType } from 'tools/types/content';

// mocks
import { mockContent } from 'tools/mocks/content';

// mui
import { Box } from '@material-ui/core';

interface Props {
  contentID: string;
  mutateReply: () => void;
}

const ContentDetail = ({ contentID, mutateReply }: Props) => {
  const [dialog, setDialog] = useState(false);

  const { push } = useRouter();

  return (
    <Box
      className="card--rounded-white"
      display="grid"
      padding={3}
      style={{ gap: 22 }}
    >
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
          <>
            <Header content={content} onDelete={() => setDialog(true)} />
            <div dangerouslySetInnerHTML={{ __html: content.data }} />
            <Box borderColor="grey.100" borderTop={1} marginX={-3} />
          </>
        )}
      </Query>
      <Box>
        <ReplyForm contentID={contentID} onSubmit={() => mutateReply()} />
      </Box>
      {dialog && (
        <DeleteContent
          contentID={contentID}
          onCancel={() => setDialog(null)}
          onDelete={() => push('/')}
        />
      )}
    </Box>
  );
};

export default ContentDetail;
