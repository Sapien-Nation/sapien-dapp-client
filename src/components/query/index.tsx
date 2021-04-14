import useSWR, { mutate } from 'swr';

// types
import type { SWRConfiguration, Key } from 'swr';

// mui
import { Skeleton } from '@material-ui/lab';

// components
import { ErrorView } from 'components/general';

interface Props {
  apiUrl: Key;
  // eslint-disable-next-line @typescript-eslint/ban-types
  children?: Function | null;
  loader?: React.ReactElement;
  options?: SWRConfiguration;
}

export type Error = {
  message: string;
};

const Query = ({ apiUrl, children, loader = <Skeleton />, options }: Props) => {
  const { data, error } = useSWR(apiUrl, options);

  if (apiUrl !== null && !data && !error) return loader;

  if (error) {
    return <ErrorView error={error as Error} onClick={() => mutate(apiUrl)} />;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  return children ? (children as Function)(data) : null;
};

export default Query;
