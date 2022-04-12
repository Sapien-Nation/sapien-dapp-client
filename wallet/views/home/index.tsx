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
      <button
        className="rounded-full text-sapien-neutral-200 flex items-center"
        onClick={onDeposit}
      >
        <PlusIcon className="w-5 mx-auto" />
        <span className="ml text-sm">Add</span>
      </button>
      <div className="mt-3 flex justify-center">
        <div>
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
      </div>
    </>
  );
};

export default Home;
