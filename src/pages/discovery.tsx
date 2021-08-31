import dynamic from 'next/dynamic';

// components
const DynamicLayout = dynamic<any>(
  () => import('components/common').then((mod) => mod.Layout) as any,
  { ssr: false }
);
const DynamicTribeCard = dynamic<any>(
  () => import('components/discovery').then((mod) => mod.TribeCard) as any,
  { ssr: false }
);

// mui
import { Box } from '@material-ui/core';

const tribes = [
  {
    avatar:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/ee1954af-deb5-419a-bd39-0ba7f6fb9639-72x72.jpg',
    cover:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/cover/bc048669-0f34-4023-8b72-6cea9b7197da-295x115.jpeg',
    description: 'Financial advice for the metaverse and beyond',
    id: '8de0eb01-4594-47be-8af4-c37c2eaaa5f7',
    isMember: 'false',
    name: 'Finance Your Future',
    membersCount: '372812',
    price: '2500',
  },
  {
    avatar:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/9d6ffd24-5232-4d7e-8808-a53070634a3a-72x72.jpeg',
    cover:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/cover/28c77091-5ac6-4843-b0b7-c5b95ad05010-295x115.jpeg',
    description:
      'Yoguies without borders. Live sessions, tips, equipment, playlists. Find your way to the yoga world with us',
    id: '16afd3a3-9305-4daa-ac9a-8da96075a192',
    isMember: 'true',
    name: 'Yoga Collective',
    membersCount: '53103',
    price: '1000',
  },
  {
    avatar:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/a5bb633f-7a36-46b1-ba8a-7b88a9db281c-72x72.jpeg',
    cover:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/cover/9aeda5ae-6eff-4bb1-82f7-6b4b6194cd6e-295x115.jpeg',
    description:
      'Al superhero universes meet in our community. Come and enjoy previews, fanart, and overall discussions about your favorite heroes',
    id: 'd4d8ee15-8d47-40ff-ba08-fa89c64cbae3',
    isMember: 'true',
    name: 'The Super Tribe',
    membersCount: '87993',
    price: '1500',
  },
  {
    avatar:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/4cb9a4a3-8d90-4e0b-9d49-a19680c95211-72x72.jpeg',
    cover:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/cover/31e45626-d62c-4a4c-8d24-9e4ed285e035-295x115.jpeg',
    description:
      'If you are a new or old creator looking for a support community, you found your place! Join the first creator-focused community and find advice, experiences, or even collaboration with other creators',
    id: '6e20ca64-f938-4a4d-a5bf-e8ace01b1c2e',
    isMember: 'false',
    name: 'Creators Hub',
    membersCount: '780',
    price: '10000',
  },
  {
    avatar:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/ae7bbf60-ef7c-42c0-a0fa-4cd2ad8ba478-72x72.jpeg',
    cover:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/cover/e7e3f5c5-9283-4b53-8bbd-6f35f8d139ce-295x115.jpeg',
    description:
      'Outdoors life is better when you get anywhere you want to, with your own power. Find the best places for a hike or ride with us, meetup with community members, and find out about the best gear',
    id: '89b7b19a-f32d-4d80-985a-13d75b5cbf1e',
    isMember: 'false',
    name: 'Hikes and bikes',
    membersCount: '273347',
    price: '1500',
  },
  {
    avatar:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/8b375236-8b0d-4a45-be2e-5704936d0b24-72x72.png',
    cover:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/cover/3e015ebf-09d2-42c8-9cf0-b04fe85bced6-295x115.jpeg',
    description:
      'Stand-up comedy, memes, fails, sketches, and all-around funny content',
    id: '24145614-39e6-4acd-87a8-26005b5df74a',
    isMember: 'true',
    name: 'Laugh Club',
    membersCount: '209829',
    price: '1250',
  },
  {
    avatar:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/f57a9057-7044-43d9-a160-f90adfaf6329-72x72.jpeg',
    cover:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/cover/e3336d62-d1dd-4d77-9cd0-5e1643385380-295x115.jpeg',
    description: 'A community to share the love for our furry family members',
    id: 'a6e495f2-13fa-4be9-ac25-1ea8fd288a3f',
    isMember: 'false',
    name: 'Cold noses crew',
    membersCount: '93424',
    price: '1000',
  },
  {
    avatar:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/ccd0e122-473a-4d43-ad10-277052cf39b0-72x72.jpeg',
    cover:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/cover/dbb5c2e2-efdd-4fab-b638-09dd393c9297-295x115.jpeg',
    description:
      "Have you ever felt hugged by a meal? That's comfort food! Join us and learn all about love-carrying meals that will make you feel at home, anywhere",
    id: 'a9abfd69-d7d3-45f4-a1c4-188bc514f8ff',
    isMember: 'true',
    name: 'Soul recipes',
    membersCount: '1273',
    price: '2500',
  },
  {
    avatar:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/ad6c3e7f-7bd8-485a-be5d-7f84c8d550eb-72x72.jpeg',
    cover:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/cover/fa5e0031-951f-42df-901f-c298ff7d2a58-295x115.jpeg',
    description:
      "If you are looking for an adventure, look no more. Here you'll find the best places for your next adventure, and if you are lucky, even member discounts",
    id: 'fd58af46-6ec3-420a-a800-e0184556de61',
    isMember: 'true',
    name: 'Travel Adventure and beyond',
    membersCount: '2129',
    price: '2000',
  },
  {
    avatar:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/1c2b81c9-394d-4945-901f-7657bbd48157-72x72.jpeg',
    cover:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/cover/0c8fcc77-080a-4ba7-981f-a35938cdc5dd-295x115.pn',
    description:
      'Get all the help you need making your work-from-home situation a dream come true',
    id: '11941dce-310c-40e8-9c67-59bca385552f',
    isMember: 'true',
    name: 'WFH diary',
    membersCount: '293784',
    price: '2500',
  },
  {
    avatar:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/46d7ccd3-b531-4626-bdd4-9c2a64fe9b7a-72x72.jpeg',
    cover:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/cover/ff9ab3bf-5b0b-4259-b78a-5361b8d047e9-295x115.jpeg',
    description:
      'We share our passion for gardening, tips, techniques, and our experiences growing beautiful, delicious products without leaving home',
    id: 'f81455f5-ee56-4f44-9111-8c210faa9be4',
    isMember: 'false',
    name: 'Our garden',
    membersCount: '58692',
    price: '1500',
  },
  {
    avatar:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/bf38418b-6dee-482f-b5a8-aedabc3c7f90-72x72.jpeg',
    cover:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/cover/b1e7cc74-525f-49a6-8d38-6bd9ba621f5d-295x115.jpeg',
    description:
      'Sweet tooth fairy brings weekly recipes that will sweeten your life',
    id: '72fdd2cc-f1a0-4e48-ae69-5519cb065ee4',
    isMember: 'false',
    name: 'Sweet tooth fairy',
    membersCount: '60678',
    price: '2000',
  },
];

const DiscoveryPage = () => (
  <Box
    className="card--rounded-gray"
    marginTop={12.7}
    paddingX={2.8}
    paddingY={4}
  >
    <Box
      display="grid"
      style={{
        gap: '1.6rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(32rem, 34.1rem))',
      }}
    >
      {tribes.map((tribe: any) => (
        <DynamicTribeCard key={tribe.id} tribe={tribe} />
      ))}
    </Box>
  </Box>
);

DiscoveryPage.Layout = DynamicLayout;

export default DiscoveryPage;
