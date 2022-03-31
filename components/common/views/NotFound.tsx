interface Props {
  message: string;
}

const NotFound = ({ message }: Props) => (
  <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden  h-full w-full">
    <div className="absolute inset-0">
      <img
        className="h-full w-full object-cover"
        src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
        alt="People working on laptops"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
    </div>
    <div className="px-4 py-4 bottom-0 absolute w-full text-center">
      <p className="mt-6 text-xl text-white font-semibold">{message}</p>
    </div>
  </div>
);

export default NotFound;
