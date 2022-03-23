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
  hardReload?: boolean;
  loadingComponent?: React.ReactNode | null;
  showRefresh?: boolean;
  refreshLabel?: string;
  refreshComponent?: React.ReactNode | null;
  reachingEndComponent?: React.ReactNode | null;
  topPlaceholder?: React.ReactNode | null;
  pageSize?: number;
}

const InfiniteScroll = ({
  apiUrl,
  children,
  emptyComponent = null,
  hardReload = false,
  showRefresh = false,
  refreshLabel = 'New Content',
  refreshComponent = null,
  loadingComponent = null,
  reachingEndComponent = null,
  topPlaceholder = null,
  pageSize = 10,
}: Props) => {
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (...args) => getKey(...args, apiUrl),
    fetcher
  );

  useEffect(() => {
    if (hardReload) {
      mutate();
    }
  }, [hardReload, mutate]);

  const isEmpty = data?.[0]?.data.length === 0;

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isReachingEnd = size === pageSize;
  const isRefreshing = isValidating && data && data.length === size;

  useEffect(() => {
    if (isVisible && !isReachingEnd && !isRefreshing) {
      setSize(size + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, isRefreshing]);

  return (
    <div className="overflow-auto w-full min-h-full">
      {/* Above the list */}
      {topPlaceholder}
      {isRefreshing && refreshComponent}

      {/* Refresh (Websockets) */}
      {showRefresh && (
        <button disabled={isRefreshing} onClick={() => mutate()}>
          {refreshLabel}
        </button>
      )}

      {/* List */}
      {children(data ? [].concat(...data[0].data) : [])}

      {/* Under the list List */}
      {isEmpty && emptyComponent}

      {/* Ref Target */}
      <div ref={ref}>
        {isLoadingMore && loadingComponent}
        {isReachingEnd && reachingEndComponent}
      </div>
    </div>
  );
};

export default InfiniteScroll;
