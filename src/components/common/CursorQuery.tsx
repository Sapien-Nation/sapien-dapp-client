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
        api={apiUrl}
        options={{
          onSuccess: ({ posts }: any) => {
            setTempCursor(cursor);
            setItems([...items, ...posts]);
          },
        }}
      >
        {() => {
          return (
            <InfiniteScroll
              items={items}
              loadMore={() => {
                setCursor(tempCursor);
                return Promise.resolve();
              }}
              {...rest}
            />
          );
        }}
      </Query>
    </>
  );
};

export default CursorQuery;
