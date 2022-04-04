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
    if (isVisible && !isReachingEnd && !isRefreshing) {
      setSize(size + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, isRefreshing]);

  return (
    <div className="overflow-auto w-full flex-1">
      {/* List */}
      {isLoadingInitialData ? null : (
        <>{children(data ? [].concat(...data[0].data) : [])}</>
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
