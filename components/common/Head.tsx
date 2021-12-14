import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

interface Props {
  children?: React.ReactElement | null;
  title: string;
}

const Head = ({ title }: Props) => {
  const { pathname } = useRouter();

  return (
    <NextSeo
      title={`Sapien | ${title}`}
      description="Sapien is a Web3 social network that rewards content creators and puts users back in control of their data. Built on Ethereum ♥️."
      canonical={process.browser ? window.location.host : ''}
      openGraph={{
        url: process.browser ? `${window.location.host}/${pathname}` : '',
        title: 'Create your Sapien Account',
        description: 'Come and join us at Sapien',
        images: [
          {
            url: 'https://d1bdmh0gdusw0k.cloudfront.net/images/misc/passport.png',
            width: 800,
            height: 600,
            alt: 'Sapien Logo',
            type: 'image/png',
          },
          {
            url: 'https://d1bdmh0gdusw0k.cloudfront.net/images/misc/passport.png',
            width: 900,
            height: 800,
            alt: 'Sapien Logo',
            type: 'image/png',
          },
        ],
        site_name: 'Sapien Tribe',
      }}
      twitter={{
        handle: '@sapien_network',
        site: 'https://www.sapien.network/',
        cardType: 'summary_large_image',
      }}
    />
  );
};

export default Head;
