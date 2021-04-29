import { useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { WindowScroller } from 'react-virtualized';

export interface Props {
  hasNextPage: boolean;
  height: number;
  itemSize: number;
  items: Array<any>;
  loadMore: () => Promise<any>;
  loadingComponent: React.ReactElement;
  renderItem: (data: any) => React.ReactElement;
  useWindowScroll?: boolean;
  width: number | string;
}

const InfiniteScroll = ({
  hasNextPage,
  height,
  itemSize,
  items,
  loadMore,
  loadingComponent,
  renderItem,
  useWindowScroll = false,
  width,
}: Props) => {
  const infiniteLoaderRef = useRef(null);
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const isItemLoaded = (index) => !hasNextPage || index < items.length;

  const Item = ({ index, style }) => {
    return (
      <div style={style}>
        {isItemLoaded(index) ? renderItem(items[index]) : loadingComponent}
      </div>
    );
  };

  const handleScroll = ({ scrollTop }) => {
    if (infiniteLoaderRef?.current?._listRef) {
      infiniteLoaderRef.current._listRef.scrollTo(scrollTop);
    }
  };

  return (
    <InfiniteLoader
      ref={infiniteLoaderRef}
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMore}
    >
      {({ onItemsRendered, ref }) => (
        <>
          {useWindowScroll && (
            <WindowScroller onScroll={handleScroll}>
              {() => <div />}
            </WindowScroller>
          )}

          <List
            ref={ref}
            height={useWindowScroll ? window.innerHeight : height}
            itemCount={itemCount}
            itemSize={itemSize}
            style={useWindowScroll ? { height: '100%' } : null}
            width={width}
            onItemsRendered={onItemsRendered}
          >
            {Item}
          </List>
        </>
      )}
    </InfiniteLoader>
  );
};

export default InfiniteScroll;
