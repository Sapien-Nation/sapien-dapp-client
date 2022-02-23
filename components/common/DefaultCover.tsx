import { tw } from 'twind';

interface Props {
  name: string;
}

const DefaultCover = ({ name = 'Sapien' }: Props) => (
  <div
    className={tw`bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 h-48 relative w-full flex justify-center items-center`}
  >
    <h1 className={tw`text-xl text-white`}>{name}</h1>
  </div>
);

export default DefaultCover;
