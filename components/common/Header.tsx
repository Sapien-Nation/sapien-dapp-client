import { Image } from '.';

const Header = ({ alt, src, ...rest }) => (
  <div style={{ position: 'relative', width: '100%', height: '200px' }}>
    {/* @ts-ignore */}
    <Image {...rest} alt={alt} src={src} layout="fill" objectFit="cover" />
  </div>
);

export default Header;
