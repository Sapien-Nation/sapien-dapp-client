import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Props {
  to: string;
}

const Redirect = ({ to }: Props) => {
  const { push } = useRouter();

  useEffect(() => {
    push(to);
  }, []);

  return null;
};

export default Redirect;
