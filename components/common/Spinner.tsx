import { tw } from 'twind';

const Spinner = () => (
  <div
    className={tw`items-center flex absolute h-full w-full top-0 left-0 justify-center`}
  >
    <div
      style={{ borderTopColor: 'transparent' }}
      className={tw`w-16 h-16 border-4 border-purple-400 border-solid rounded-full animate-spin`}
    />
  </div>
);

export default Spinner;

// alignItems="center"
// display="flex"
// height="100%"
// justifyContent="center"
// left={0}
// position="absolute"
// top={0}
// width="100%"
