import useSWR, { mutate } from 'swr';

// types
import type { SWRConfiguration, Key } from 'swr';

// components
import ErrorView from './ErrorView';

interface Props {
  apiUrl: Key;
  // eslint-disable-next-line @typescript-eslint/ban-types
  children?: Function | null;
  showValidating?: boolean;
  options?: SWRConfiguration;
}

export type Error = {
  message: string;
};

const Query = ({
  apiUrl,
  children,
  showValidating = false,
  options,
}: Props) => {
  const { data, error, isValidating } = useSWR(apiUrl, options);

  if (apiUrl !== null) {
    if ((!data && !error) || (showValidating && isValidating)) {
      return null; // TODO loader
    }
  }
  if (error) {
    return <ErrorView error={error as Error} onClick={() => mutate(apiUrl)} />;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  return children ? (children as Function)(data) : null;
};

export default Query;
