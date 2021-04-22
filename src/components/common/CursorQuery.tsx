import { useState } from 'react';

// types
import type { InfiniteScrollProps } from 'components/common';

// components
import { InfiniteScroll, Query } from 'components/common';

interface Props extends Omit<InfiniteScrollProps, 'items' | 'loadMore'> {
  baseApiUrl: string;
}

const CursorQuery = ({ baseApiUrl, ...rest }: Props) => {
  const [items, setItems] = useState<Array<any>>([]);
  const [cursor, setCursor] = useState('');
  const [tempCursor, setTempCursor] = useState('');

  const params = cursor ? `?cursor=${cursor}` : '';
  const apiUrl = `${baseApiUrl}${params}`;

  return (
    <>
      <Query
        apiUrl={apiUrl}
        loader={null}
        options={{
          onSuccess: ({ cursor, posts }: any) => {
            setTempCursor(cursor);
            setItems([...items, ...posts]);
          },
        }}
      />
      <InfiniteScroll
        items={items}
        loadMore={() => {
          setCursor(tempCursor);
          return Promise.resolve();
        }}
        {...rest}
      />
    </>
  );
};

export default CursorQuery;
