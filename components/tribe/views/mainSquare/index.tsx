// components
import { Head } from 'components/common';

// types
import type { Square } from 'tools/types/square';

interface Props {
  square: Square;
}

const MainSquareView = ({ square }: Props) => {
  return (
    <>
      <Head title={square.name} />
    </>
  );
};

export default MainSquareView;
