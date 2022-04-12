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
    { id: 1, image: <AcademicCapIcon className="w-6" /> },
    { id: 2, image: <XIcon className="w-6" /> },
    { id: 3, image: <AcademicCapIcon className="w-6" /> },
    { id: 4, image: <ChartPieIcon className="w-6" /> },
    { id: 5, image: <CollectionIcon className="w-6" /> },
    { id: 6, image: <XIcon className="w-6" /> },
    { id: 7, image: <CollectionIcon className="w-6" /> },
    { id: 8, image: <ChartPieIcon className="w-6" /> },
  ];

  const half = Math.ceil(tokens.length / 2);

  return (
    <>
      <div className="mt-3">
        <button
          className="border-2 rounded-full h-12 w-12 mx-auto"
          onClick={onDeposit}
        >
          <PlusIcon className="w-6 mx-auto" />
        </button>
        <ol className="even">
          {tokens.splice(0, half).map((token) => {
            return (
              <li className="hex" key={token.id}>
                <div className="hex-content">{token?.image}</div>
              </li>
            );
          })}
        </ol>
        <ol className="odd">
          {tokens.splice(-half).map((token) => {
            return (
              <li className="hex" key={token.id}>
                <div className="hex-content">{token?.image}</div>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
};

export default Home;
