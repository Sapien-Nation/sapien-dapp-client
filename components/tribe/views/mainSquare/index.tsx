import { useRouter } from 'next/router';

// components
import { Head, Header } from 'components/common';

// hooks
import { useTribe } from 'hooks/tribe';

// types
import type { Square } from 'tools/types/square';

interface Props {
  square: Square;
}

const MainSquareView = ({ square }: Props) => {
  const { query } = useRouter();
  const { tribeID } = query;

  const tribe = useTribe(tribeID as string);
  return (
    <>
      <Head title={square.name} />
      <Header tribe={tribe} />
    </>
  );
};

export default MainSquareView;
