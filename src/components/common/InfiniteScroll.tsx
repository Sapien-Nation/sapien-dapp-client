import { useEffect, useRef, useState } from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  List,
  WindowScroller,
} from 'react-virtualized';

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
  items,
  loadMore,
  loadingComponent,
  renderItem,
  useWindowScroll = false,
}: Props) => {
  const infiniteLoaderRef = useRef(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const isItemLoaded = (index) => !hasNextPage || index < items.length;

  const handleScroll = ({ scrollTop }) => {
    if (infiniteLoaderRef?.current?._listRef) {
      infiniteLoaderRef.current._listRef.scrollTo(scrollTop);
    }
  };

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 100,
  });

  const rowRenderer = ({ index, key, parent, style }) => {
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        columnIndex={0}
        parent={parent}
        rowIndex={index}
      >
        {({ registerChild }) => (
          <div ref={registerChild} style={style}>
            {isItemLoaded(index) ? renderItem(items[index]) : loadingComponent}
          </div>
        )}
      </CellMeasurer>
    );
  };

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  return (
    <InfiniteLoader
      ref={infiniteLoaderRef}
      isRowLoaded={isItemLoaded}
      loadMoreRows={loadMore}
      rowCount={itemCount}
    >
      {({ onRowsRendered, registerChild }) => (
        <>
          {useWindowScroll && (
            <WindowScroller onScroll={handleScroll}>
              {() => <div />}
            </WindowScroller>
          )}
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                ref={registerChild}
                height={useWindowScroll ? windowHeight : height}
                rowCount={itemCount}
                rowHeight={cache.rowHeight}
                rowRenderer={rowRenderer}
                width={width}
                onRowsRendered={onRowsRendered}
              />
            )}
          </AutoSizer>
        </>
      )}
    </InfiniteLoader>
  );
};

export default InfiniteScroll;
