import { Image } from '.';

const Header = ({ alt, src, ...rest }) => (
  <div
    className="m-4 shadow-md rounded-lg"
    style={{ position: 'relative', minHeight: '250px' }}
  >
    {/* @ts-ignore */}
    <Image
      {...rest}
      alt={alt}
      src={src}
      className="rounded-lg m-4"
      layout="fill"
      objectFit="cover"
    />
  </div>
);

export default Header;
