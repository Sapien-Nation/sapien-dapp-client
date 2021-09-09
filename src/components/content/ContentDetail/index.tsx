import { mutate } from 'swr';
import { useState } from 'react';
import { useRouter } from 'next/router';

// components
import Actions from './Actions';
import Header from 'components/content/ContentItem/Header';
import ReplyForm from 'components/reply/ReplyForm';
import { DeleteContent } from 'components/content/Modals';
import { ContentDetailSkeleton, Query } from 'components/common';

// types
import type { Content as ContentType } from 'tools/types/content';

// context
import { useAuth } from 'context/user';

// mui
import { Box } from '@material-ui/core';

interface Props {
  apiUrl: string;
  contentID: string;
}

const ContentDetail = ({ apiUrl, contentID }: Props) => {
  const [dialog, setDialog] = useState(false);

  const { push } = useRouter();
  const { me } = useAuth();

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
            <Header
              content={content}
              variant="detail"
              onDelete={() => setDialog(true)}
            />
            {!content.deletedAt && (
              <>
                <div dangerouslySetInnerHTML={{ __html: content.body }} />
              </>
            )}

            <Actions content={content} user={me} />

            {!content.deletedAt && (
              <>
                <Box borderColor="grey.100" borderTop={1} marginX={-3} />
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
              </>
            )}

            {dialog && (
              <DeleteContent
                contentID={contentID}
                onCancel={() => setDialog(null)}
                onDelete={() => {
                  setDialog(null);
                  push(`/client/${content.group.id}`);
                }}
              />
            )}
          </>
        )}
      </Query>
    </Box>
  );
};

export default ContentDetail;
