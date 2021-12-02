import NextHead from 'next/head';

interface Props {
  children?: React.ReactElement | null;
  title: string;
}

const Head = ({ children = null, title }: Props) => (
  <NextHead>
    <title>Sapien | {title}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta
      content="Sapien is a Web3 social network that rewards content creators and puts users back in control of their data. Built on Ethereum ♥️."
      name="description"
    />
    <meta property="og:title" content={`Sapien | ${title}`} />
    <meta
      property="og:description"
      content="Sapien is a Web3 social network that rewards content creators and puts users back in control of their data. Built on Ethereum ♥️."
    />
    <meta
      property="og:url"
      content="https://passport-sandbox.sapien.network/"
    />
    <meta property="twitter:card" content="summary_large_image" />
    <meta
      property="og:image"
      content="https://d1bdmh0gdusw0k.cloudfront.net/images/misc/passport.png"
    />

    <meta property="og:type" content="website" />
    {children}
  </NextHead>
);

export default Head;
