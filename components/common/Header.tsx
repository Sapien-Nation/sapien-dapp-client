import { Image } from '.';
import { tw } from 'twind';

const Header = ({ alt, src, ...rest }) => (
  <div
    className={tw`m-4 shadow-md rounded-lg`}
    style={{ position: 'relative', minHeight: '250px' }}
  >
    {/* @ts-ignore */}
    <Image
      {...rest}
      alt={alt}
      src={src}
      className={tw`rounded-lg m-4`}
      layout="fill"
      objectFit="cover"
    />
  </div>
);

export default Header;
