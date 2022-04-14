import useSWR from 'swr';

// components
import { ErrorView } from './views';

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
  loader = null,
  showValidating = false,
  options,
}: Props) => {
  const { data, error, isValidating, mutate } = useSWR(api, options);

  if (api !== null) {
    if ((!data && !error) || (showValidating && isValidating)) {
      return loader;
    }
    if (!error && data.length === 0 && Boolean(empty)) {
      return empty;
    }
  }
  if (error) {
    return (
      <ErrorView message={error.message} code={500} onRetry={() => mutate()} />
    );
  }

  return children ? (children as Function)(data) : null;
};

export default Query;
