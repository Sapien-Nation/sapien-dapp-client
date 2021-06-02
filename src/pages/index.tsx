import { useEffect } from 'react';

// next
import { useRouter } from 'next/router';

// hooks
import { getTribes } from 'hooks/tribeBar';

// components
import Layout from './Layout';
import Post from 'components/post/PostItem';
import { mockContent, mockContentGroup } from 'tools/mocks/content';
import { mockTribe } from 'tools/mocks/tribeBar';

const IndexPage = () => {
  const tribes = getTribes();
  const { push } = useRouter();

  useEffect(() => {
    if (tribes?.length) {
      // push(`/client/${tribes[0].id}`);
    }
  }, [tribes, push]);

  return (
    <div style={{ width: 790 }}>
      <Post
        post={mockContent({
          createdAt: '2021-06-02T10:08:42.833Z',
          data: '<div><p>Get a new word from @linhnguyen to visit Carrot Labs, a great office and I love it</p></div>',
          topics: ['lol', 'lovew'],
          tribe: mockTribe({ name: 'Sapien' }),
          group: mockContentGroup({ name: 'Group' }),
        })}
      />
    </div>
  );
};

IndexPage.Layout = Layout;

export default IndexPage;
