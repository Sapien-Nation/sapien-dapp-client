import _first from 'lodash/first';
import { useRef, useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';

// api
import { fetcher } from 'api';

// hooks
import useOnScreen from 'hooks/useOnScreen';

const getKey = (pageIndex, previousPageData, apiUrl) => {
  if (previousPageData && !previousPageData.nextCursor) return null;

  if (pageIndex === 0) return apiUrl;

  return `${apiUrl}?nextCursor=${previousPageData.nextCursor}`;
};

interface Props {
  apiUrl: string;
  children: any;
  emptyComponent?: React.ReactNode | null;
  loadingComponent?: React.ReactNode | null;
  reachingEndComponent?: React.ReactNode | null;
  pageSize?: number;
}

const InfiniteScroll = ({
  apiUrl,
  children,
  loadingComponent = null,
  reachingEndComponent = null,
  pageSize = 10,
}: Props) => {
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (...args) => getKey(...args, apiUrl),
    fetcher
  );

  const isLoadingInitialData = data === undefined && error === undefined;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isReachingEnd = size === pageSize;
  const isRefreshing = isValidating && data && data.length === size;

  useEffect(() => {
    if (isVisible) {
      if (
        isLoadingInitialData ||
        isRefreshing ||
        isReachingEnd ||
        isLoadingMore
      )
        return;
      setSize(size + 1);
    }
  }, [isVisible, isRefreshing, isReachingEnd, isLoadingMore]);

  return (
    <div className="overflow-auto w-full h-full flex-1">
      {/* List */}
      {isLoadingInitialData ? null : (
        <>{children(data ? [].concat(...data[0].data) : [])}</>
      )}

      {isLoadingMore && loadingComponent}
      {isReachingEnd && reachingEndComponent}

      {/* Ref Target */}
      <div ref={ref} />
    </div>
  );
};

export default InfiniteScroll;
