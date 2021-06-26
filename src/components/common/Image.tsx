interface Props {
  alt: string;
  defaultImage?: string;
  fallbackImage?: string;
  src: string;
  style: React.CSSProperties;
}

const Image = ({
  alt,
  defaultImage = 'https://d151dmflpumpzp.cloudfront.net/images/tribes/default_temp.jpeg',
  fallbackImage = defaultImage,
  src,
  ...rest
}: Props) => {
  const handleOnError = (event) => {
    event.target.src = fallbackImage;
  };

  return (
    <img
      alt={alt}
      src={src || defaultImage}
      onError={handleOnError}
      {...rest}
    />
  );
};

export default Image;
