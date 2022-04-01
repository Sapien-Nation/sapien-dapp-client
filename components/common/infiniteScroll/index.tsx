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

const Empty = () => {
  return (
    <div className="flex justify-center h-full items-center flex-col">
      <img
        src="https://assets.website-files.com/5e51c674258ffe10d286d30a/5e532a2aeba259dc7140a0e2_peep-1.svg"
        alt="Free open source Peep visit https://www.openpeeps.com/"
      />
      <p className="mt-6 text-sm text-white font-semibold">
        This is the beginning of a beautiful history at Sapien{' '}
      </p>
    </div>
  );
};

const InfiniteScroll = ({
  apiUrl,
  children,
  emptyComponent = <Empty />,
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

  const isLoadingInitialData = data === undefined && error === undefined;
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

  const feedData = data ? [].concat(...data[0].data) : [];
  return (
    <div className="overflow-auto w-full flex-1">
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
      {isLoadingInitialData ? null : (
        <>
          {feedData.length === 0 ? (
            <>{emptyComponent}</>
          ) : (
            <>{children(feedData)}</>
          )}
        </>
      )}

      {/* Ref Target */}
      <div ref={ref}>
        {isLoadingMore && loadingComponent}
        {isReachingEnd && reachingEndComponent}
      </div>
    </div>
  );
};

export default InfiniteScroll;
