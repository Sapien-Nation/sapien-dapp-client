import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface Props extends ImageProps {
  fallbackSrc: string;
}

const ImageWithFallback = ({ alt, src, fallbackSrc, ...rest }: Props) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;
