import useSWR, { mutate } from 'swr';

// components
import ErrorView from './views/ErrorView';
import Spinner from './Spinner';

// types
import type { SWRConfiguration, Key } from 'swr';

interface Props {
  api: Key;
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
  loader = <Spinner />,
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

  return children ? (children as Function)(data) : null;
};

export default Query;
