import { useState } from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';

// mui
import { Box } from '@material-ui/core';

// components
import { Query } from 'components/common';

export interface InfiniteScrollProps {
  hasNextPage: boolean;
  items: Array<any>;
  loadMore: () => Promise<any>;
  loadingComponent: React.ReactElement;
  renderItem: (data: any) => React.ReactElement;
}

interface Props extends Omit<InfiniteScrollProps, 'items' | 'loadMore'> {
  baseApiUrl: string;
}

const CursorQuery = ({
  baseApiUrl,
  hasNextPage,
  renderItem,
  ...rest
}: Props) => {
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
          onSuccess: ({ data }: any) => {
            setTempCursor(cursor);
            setItems([...items, ...data]);
          },
        }}
      >
        {() => {
          return (
            <InfiniteScrollComponent
              dataLength={items.length}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              hasMore={hasNextPage}
              loader={<h4>Loading...</h4>}
              next={() => {
                setCursor(tempCursor);
                setItems([...items, items[0]]);
                return Promise.resolve();
              }}
              {...rest}
            >
              {items.map((item) => (
                <Box key={item.id} marginY={2}>
                  {renderItem(item)}
                </Box>
              ))}
            </InfiniteScrollComponent>
          );
        }}
      </Query>
    </>
  );
};

export default CursorQuery;
