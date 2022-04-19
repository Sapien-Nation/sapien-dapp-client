import useSWRInfinite from 'swr/infinite';
import _get from 'lodash/get';
import _last from 'lodash/last';
import { useCallback, useMemo, useRef } from 'react';

// api
import { fetcher as axiosFetcher } from 'api';

// types
import type { SWRInfiniteConfiguration } from 'swr/infinite';

export const getKeyFunction = (isFetching, dataPath, apiKey) => {
  return (index, previousPage, ...rest) => {
    // we've reached the last page, no more fetching
    if (previousPage?.nextCursor === null) return null;

    if (isFetching.current && index) return null;

    if (index === 0) return apiKey;

    return `${apiKey}?nextCursor=${previousPage.nextCursor}`;
  };
};

const useGetInfinitePages = <Page extends object>(
  apiKey: string,
  options: SWRInfiniteConfiguration = {}
) => {
  const isFetching = useRef(false);
  const dataPath = 'data';

  const { data, error, isValidating, mutate, size, setSize } =
    useSWRInfinite<Page>(
      getKeyFunction(isFetching, dataPath, apiKey),
      async (key: any) => {
        let val: Page;
        try {
          isFetching.current = true;
          val = await axiosFetcher(key);
        } catch (e) {
          throw e;
        }

        if (isFetching.current) {
          isFetching.current = false;
        }

        return val;
      },
      options
    );

  const firstPageData = _get(data?.[0], dataPath);
  const lastPage = _last(data);
  const isRefreshing = isValidating && data?.length === size;
  const isEmpty = firstPageData?.length === 0;

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (isValidating && size > 1 && data && typeof data[size - 1] === 'undefined');
  const fetchMore = useCallback(() => {
    if (isLoadingMore || isFetching.current) return null;

    setSize((size) => {
      return size + 1;
    });
  }, [isLoadingMore, setSize]);

  const flat = useMemo(
    () =>
      data
        ?.map((page) => _get(page, dataPath))
        ?.flat(1)
        .filter(Boolean),
    [data, dataPath]
  );

  return {
    data: flat ?? [],
    pages: data,
    error,
    isValidating,
    mutate,
    fetchMore,
    // @ts-ignore
    hasReachEnd: _last(data)?.nextCursor === null,
    isFetchingMore: !!isLoadingMore,
    isRefreshing,
    isEmpty,
    isLoadingInitialData,
    isLoadingMore,
    lastPage,
    size,
  };
};

export default useGetInfinitePages;
