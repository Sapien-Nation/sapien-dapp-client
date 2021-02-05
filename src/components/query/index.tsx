import { useQuery } from 'react-query';

// mui
import { Skeleton } from '@material-ui/lab';

interface Props {
  apiUrl: string | Array<string>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  children: Function | null;
  error?: React.ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetcher?: () => Promise<any> | null;
  loader?: React.ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
}

const Query: React.FC<Props> = ({
  apiUrl,
  children,
  error = <h1>TODO ERROR VIEW</h1>,
  fetcher = null,
  loader = <Skeleton />,
  options = {}
}) => {
  const { data, isLoading, isError } = useQuery(apiUrl, fetcher, options);

  if (isLoading) return loader;

  if (isError) return error;

  // eslint-disable-next-line @typescript-eslint/ban-types
  return children ? (children as Function)(data) : null;
};

export default Query;
