import { useState } from 'react';

// types
import type { InfiniteScrollProps } from 'components/common';

// components
import { Query } from 'components/common';

interface Props extends Omit<InfiniteScrollProps, 'items' | 'loadMore'> {
  baseApiUrl: string;
}

const CursorQuery = ({ baseApiUrl }: Props) => {
  const [items, setItems] = useState<Array<any>>([]);
  const [cursor] = useState('');
  const params = cursor ? `?cursor=${cursor}` : '';
  const apiUrl = `${baseApiUrl}${params}`;

  return (
    <>
      <Query
        apiUrl={apiUrl}
        loader={null}
        options={{
          onSuccess: ({ posts }: any) => {
            setItems([...items, ...posts]);
          },
        }}
      />
      <>TODO Infinte Scroll</>
    </>
  );
};

export default CursorQuery;
