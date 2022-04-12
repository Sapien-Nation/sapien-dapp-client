import {
  AcademicCapIcon,
  ChartPieIcon,
  CollectionIcon,
  PlusIcon,
  XIcon,
} from '@heroicons/react/outline';

interface Props {
  onDeposit: () => void;
}

const Home = ({ onDeposit }: Props) => {
  const tokens = [
    { id: 1, image: <AcademicCapIcon className="w-6 mx-auto" /> },
    { id: 2, image: <XIcon className="w-6 mx-auto" /> },
    { id: 3, image: <AcademicCapIcon className="w-6 mx-auto" /> },
    { id: 4, image: <ChartPieIcon className="w-6 mx-auto" /> },
    { id: 5, image: <CollectionIcon className="w-6 mx-auto" /> },
    { id: 6, image: <XIcon className="w-6 mx-auto" /> },
    { id: 7, image: <CollectionIcon className="w-6 mx-auto" /> },
    { id: 8, image: <ChartPieIcon className="w-6 mx-auto" /> },
    { id: 9, image: <XIcon className="w-6 mx-auto" /> },
    { id: 10, image: <AcademicCapIcon className="w-6 mx-auto" /> },
    { id: 11, image: <XIcon className="w-6 mx-auto" /> },
  ];

  return (
    <div
      className="grid gap-4 text-sapien-neutral-200 py-3"
      style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
    >
      <button
        className="border-2 rounded-full h-12 w-12 mx-auto"
        onClick={onDeposit}
      >
        <PlusIcon className="w-6 mx-auto" />
      </button>
      {tokens.map((token) => {
        return (
          <button
            className="border-2 rounded-xl h-12 w-12 mx-auto transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
            key={token.id}
          >
            {token?.image}
          </button>
        );
      })}
    </div>
  );
};

export default Home;
