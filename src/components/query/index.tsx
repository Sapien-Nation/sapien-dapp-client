import useSWR, { mutate } from 'swr';

// types
import type { keyInterface } from 'swr';

// mui
import { Skeleton } from '@material-ui/lab';

// components
import { ErrorView } from 'components/general';

interface Props {
  apiUrl: keyInterface;
  // eslint-disable-next-line @typescript-eslint/ban-types
  children?: Function | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loader?: React.ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
}

export type Error = {
  message: string;
};

const Query: React.FC<Props> = ({
  apiUrl,
  children,
  loader = <Skeleton />,
  options = {}
}) => {
  const { data, error } = useSWR(apiUrl, options);

  if (apiUrl !== null && !data && !error) return loader;

  if (error) {
    return <ErrorView error={error as Error} onClick={() => mutate(apiUrl)} />;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  return children ? (children as Function)(data) : null;
};

export default Query;
