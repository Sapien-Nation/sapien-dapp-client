interface Props {
  name: string;
}

const DefaultCover = ({ name = 'Sapien' }: Props) => (
  <div
    className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 my-4 shadow-md rounded-lg relative flex justify-center items-center"
    style={{ minHeight: '250px' }}
  >
    <h1 className="text-2xl text-white">{name}</h1>
  </div>
);

export default DefaultCover;
