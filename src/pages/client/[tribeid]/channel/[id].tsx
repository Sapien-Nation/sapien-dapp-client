/* istanbul ignore file */
import { useState } from 'react';

// next
import { useRouter } from 'next/router';

// types
import type { Post } from 'tools/types/post';

// components
import Layout from 'pages/Layout';
import { CursorQuery } from 'components/common';
import { default as PostComponent } from 'components/post';

const ChannelPage = () => {
  const { query } = useRouter();
  const { id } = query;

  const baseApiUrl = `/api/channel/feed/${id}`;
  return (
    <CursorQuery
      hasNextPage
      baseApiUrl={baseApiUrl}
      height={900}
      itemSize={540}
      loadingComponent={<span>LOADING....</span>}
      renderItem={(post: Post) => <PostComponent post={post} />}
      width={1240}
    />
  );
};

ChannelPage.Layout = Layout;

export default ChannelPage;
