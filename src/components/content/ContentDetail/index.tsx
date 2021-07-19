import { useState } from 'react';
import { useRouter } from 'next/router';

// components
import Header from 'components/content/ContentItem/Header';
import ReplyForm from 'components/reply/ReplyForm';
import { DeleteContent } from 'components/content/Modals';
import { ContentDetailSkeleton, Query } from 'components/common';

// types
import type { Content as ContentType } from 'tools/types/content';

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
        api={`/api/v3/post/${contentID}`}
        loader={<ContentDetailSkeleton />}
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
