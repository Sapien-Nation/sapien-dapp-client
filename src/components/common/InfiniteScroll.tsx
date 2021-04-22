import { useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

export interface Props {
  hasNextPage: boolean;
  height: number;
  itemSize: number;
  items: Array<any>;
  loadMore: () => Promise<any>;
  loadingComponent: React.ReactElement;
  renderItem: (data: any) => React.ReactElement;
  width: number;
}

const InfiniteScroll = ({
  hasNextPage,
  height,
  itemSize,
  items,
  loadMore,
  loadingComponent,
  renderItem,
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

  return (
    <InfiniteLoader
      ref={infiniteLoaderRef}
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMore}
    >
      {({ onItemsRendered, ref }) => (
        <List
          ref={ref}
          height={height}
          itemCount={itemCount}
          itemSize={itemSize}
          width={width}
          onItemsRendered={onItemsRendered}
        >
          {Item}
        </List>
      )}
    </InfiniteLoader>
  );
};

export default InfiniteScroll;
