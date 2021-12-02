import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Props {
  path: string;
}

const Redirect = ({ path }: Props) => {
  const { push } = useRouter();

  useEffect(() => {
    push(path);
  }, [path, push]);

  return <></>;
};

export default Redirect;
