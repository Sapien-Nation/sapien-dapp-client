import useSWR, { mutate } from 'swr';

// types
import type { SWRConfiguration, Key } from 'swr';

// components
import ErrorView from './ErrorView';
import Skeleton from './Skeleton';

interface Props {
  api: Key;
  // eslint-disable-next-line @typescript-eslint/ban-types
  children?: Function | null;
  empty?: React.ReactNode;
  loader?: React.ReactNode;
  showValidating?: boolean;
  options?: SWRConfiguration;
}

export type Error = {
  message: string;
};

const Query = ({
  api,
  children,
  empty,
  loader = <Skeleton />,
  showValidating = false,
  options,
}: Props) => {
  const { data, error, isValidating } = useSWR(api, options);

  if (api !== null) {
    if ((!data && !error) || (showValidating && isValidating)) {
      return loader;
    }
    if (!error && data.length === 0 && Boolean(empty)) {
      return empty;
    }
  }
  if (error) {
    return <ErrorView error={error as Error} onClick={() => mutate(api)} />;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  return children ? (children as Function)(data) : null;
};

export default Query;
