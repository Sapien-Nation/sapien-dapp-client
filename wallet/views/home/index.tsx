import _chunk from 'lodash/chunk';
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
    // { id: 9, image: <CollectionIcon className="w-6" /> },
    // { id: 10, image: <XIcon className="w-6" /> },
    // { id: 11, image: <CollectionIcon className="w-6" /> },
    // { id: 12, image: <ChartPieIcon className="w-6" /> },
    // { id: 13, image: <CollectionIcon className="w-6" /> },
    // { id: 14, image: <XIcon className="w-6" /> },
    // { id: 15, image: <CollectionIcon className="w-6" /> },
    // { id: 16, image: <ChartPieIcon className="w-6" /> },
  ];

  return (
    <>
      <button
        className="rounded-full  flex items-center text-white font-extrabold"
        onClick={onDeposit}
      >
        <PlusIcon className="w-5 mx-auto" />
        <span className="ml text-sm">Add</span>
      </button>
      <div className="mt-3 flex justify-center">
        <div className="mt-4">
          {_chunk(tokens, 4).map((chunk, index) => (
            <ol
              className={
                index === 0 ? 'even' : index % 2 === 0 ? 'even' : 'odd'
              }
              key={index}
            >
              {chunk.map((token) => (
                <li className="hex" key={token.id}>
                  <div className="hex-content">{token?.image}</div>
                </li>
              ))}
            </ol>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
