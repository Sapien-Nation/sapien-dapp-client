import _get from 'lodash/get';
import _last from 'lodash/last';
import useSWR from 'swr';
import { useCallback, useMemo, useState } from 'react';

// api
// import { fetcher as axiosFetcher } from 'api';

// types
import type { SWRInfiniteConfiguration } from 'swr/infinite';

// export const getKeyFunction = (isFetching, dataPath, apiKey) => {
//   return (_, previousPage) => {
//     console.log(previousPage);
//     if (previousPage?.nextCursor === null) {
//       return null;
//     }

//     const params = previousPage?.nextCursor
//       ? `?nextCursor=${previousPage.nextCursor}`
//       : '';
//     return `${apiKey}${params}`;
//   };
// };

const useGetInfinitePages = <Page extends object>(
  apiKey: string,
  options: SWRInfiniteConfiguration = {}
) => {
  const [isFetching, setIsFetching] = useState(false);

  const dataPath = 'data';

  const { data, error, isValidating, mutate } = useSWR(apiKey);

  // const firstPageData = _get(data?.[0], dataPath);
  // const lastPage = _last(data);
  // const isRefreshing = isValidating && data?.length === size;
  // const isEmpty = firstPageData?.length === 0;

  // const isLoadingInitialData = !data && !error;
  // const isLoadingMore =
  //   isLoadingInitialData ||
  //   (isValidating && size > 1 && data && typeof data[size - 1] === 'undefined');

  // @ts-ignore
  // const hasReachEnd = _last(data)?.nextCursor === null;
  const fetchMore = useCallback(() => {
    // if (isFetching === false) {
    //   if (isLoadingMoreData || hasReachEnd === true) return null;
    //   console.log(`called with size ${size}`);
    //   setSize((size) => {
    //     return size + 1;
    //   });
    // }
  }, []);

  // const flat = useMemo(
  //   () =>
  //     data
  //       ?.map((page) => _get(page, dataPath))
  //       ?.flat(1)
  //       .filter(Boolean),
  //   [data, dataPath]
  // );

  return {
    data,
    error,
    isValidating,
    mutate,
    fetchMore,
  };
};

export default useGetInfinitePages;
