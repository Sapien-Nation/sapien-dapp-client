import { useQuery } from 'react-query';

// mui
import { Skeleton } from '@material-ui/lab';

// components
import { ErrorView } from 'components/general';

interface Props {
  apiUrl: string | Array<string>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  children: Function | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetcher?: () => Promise<any> | null;
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
  fetcher = null,
  loader = <Skeleton />,
  options = {}
}) => {
  const { data, error, isLoading, isError, refetch } = useQuery(
    apiUrl,
    fetcher,
    options
  );

  if (isLoading) return loader;

  if (isError) {
    return <ErrorView error={error as Error} onClick={refetch} />;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  return children ? (children as Function)(data) : null;
};

export default Query;
