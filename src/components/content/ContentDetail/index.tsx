import { mutate } from 'swr';
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
  apiUrl: string;
  contentID: string;
}

const ContentDetail = ({ apiUrl, contentID }: Props) => {
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
            {!content.deletedAt && (
              <div dangerouslySetInnerHTML={{ __html: content.data }} />
            )}
            <Box borderColor="grey.100" borderTop={1} marginX={-3} />
            {dialog && (
              <DeleteContent
                contentID={contentID}
                onCancel={() => setDialog(null)}
                onDelete={() => {
                  push(`/client/${content.group.id}`);
                }}
              />
            )}
          </>
        )}
      </Query>
      <Box>
        <ReplyForm
          contentID={contentID}
          onSubmit={(reply: ContentType) => {
            mutate(
              apiUrl,
              (replies: Array<ContentType>) => [reply, ...replies],
              false
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default ContentDetail;
