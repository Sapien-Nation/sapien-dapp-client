interface Props {
  alt: string;
  defaultImage?: string;
  src: string;
  style: React.CSSProperties;
}

const Image = ({ alt, defaultImage = 'http://', src, ...rest }: Props) => (
  <img alt={alt} src={src || defaultImage} {...rest} />
);

export default Image;
