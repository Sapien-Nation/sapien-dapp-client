import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

interface Props {
  title: string;
  image?: string;
  description?: string;
}

const Head = ({ title, image, description }: Props) => {
  const { pathname } = useRouter();

  return (
    <NextSeo
      title={title}
      description={
        description
          ? description
          : 'From the utility of our NFT Passport to our unique curation token to our new crypto token protocol, learn everything you need to know about what we’re doing.'
      }
      canonical={process.browser ? window.location.host : ''}
      openGraph={{
        url: process.browser ? `${window.location.host}${pathname}` : '',
        title: title ? title : 'Create your Sapien Account',
        description: description
          ? description
          : 'Sapien is building the world’s first sovereign digital nation, a Republic of DAOs powered by Sapien’s first-of-its-kind NFT passport.',
        images: [
          {
            url: image
              ? image
              : 'https://sapien-poc.s3.us-east-2.amazonaws.com/docs/Sapien_Litepaper.pdf',
            width: 800,
            height: 600,
            alt: 'Sapien Logo',
            type: 'image/png',
          },
        ],
        site_name: 'Sapien Nation',
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
