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
    id: '6b576b32-5079-475a-9253-526873564946',
    avatar: '/fixtures/40x40/settings.png',
    cover: '/fixtures/256x256/battery.png',
    description: 'Financial advice for the metaverse and beyond',
    isMember: 'false',
    name: 'Finance Your Future',
    membersCount: '372812',
    price: '2500',
  },
  {
    id: '6b576b32-5079-475a-9253-526873564926',
    avatar: '/fixtures/40x40/trash.png',
    cover: '/fixtures/256x256/bob.png',
    description:
      'Yoguies without borders. Live sessions, tips, equipment, playlists. Find your way to the yoga world with us',
    isMember: 'true',
    name: 'Yoga Collective',
    membersCount: '53103',
    price: '1000',
  },
  {
    id: '2b576b32-5079-475a-9253-526873564946',
    avatar: '/fixtures/40x40/messaging.png',
    cover: '/fixtures/256x256/stonks.png',
    description:
      'Al superhero universes meet in our community. Come and enjoy previews, fanart, and overall discussions about your favorite heroes',
    isMember: 'true',
    name: 'The Super Tribe',
    membersCount: '87993',
    price: '1500',
  },
  {
    id: '6c576b32-5079-475a-9253-526873564946',
    avatar: '/fixtures/40x40/food.png',
    cover: '/fixtures/256x256/dinner.png',
    description:
      'If you are a new or old creator looking for a support community, you found your place! Join the first creator-focused community and find advice, experiences, or even collaboration with other creators',
    isMember: 'false',
    name: 'Creators Hub',
    membersCount: '780',
    price: '10000',
  },
  {
    id: '9b576b32-5079-475a-9253-526873564946',
    avatar: '/fixtures/40x40/folder.png',
    cover: '/fixtures/256x256/camera.png',
    description:
      'Outdoors life is better when you get anywhere you want to, with your own power. Find the best places for a hike or ride with us, meetup with community members, and find out about the best gear',
    isMember: 'false',
    name: 'Hikes and bikes',
    membersCount: '273347',
    price: '1500',
  },
  {
    id: '6b576b32-5079-475a-3253-526873564946',
    avatar: '/fixtures/40x40/cars.png',
    cover: '/fixtures/256x256/general.png',
    description:
      'Stand-up comedy, memes, fails, sketches, and all-around funny content',
    isMember: 'true',
    name: 'Laugh Club',
    membersCount: '209829',
    price: '1250',
  },
  {
    id: '6b576a32-5079-475a-9253-526873564946',
    avatar: '/fixtures/40x40/settings.png',
    cover: '/fixtures/256x256/battery.png',
    description: 'A community to share the love for our furry family members',
    isMember: 'false',
    name: 'Cold noses crew',
    membersCount: '93424',
    price: '1000',
  },
  {
    id: '3b576b32-5079-475a-9253-526873564946',
    avatar: '/fixtures/40x40/trash.png',
    cover: '/fixtures/256x256/bob.png',
    description:
      "Have you ever felt hugged by a meal? That's comfort food! Join us and learn all about love-carrying meals that will make you feel at home, anywhere",
    isMember: 'true',
    name: 'Soul recipes',
    membersCount: '1273',
    price: '2500',
  },
  {
    id: '6b574b32-5079-475a-9253-526873564946',
    avatar: '/fixtures/40x40/messaging.png',
    cover: '/fixtures/256x256/stonks.png',
    description:
      "If you are looking for an adventure, look no more. Here you'll find the best places for your next adventure, and if you are lucky, even member discounts",
    isMember: 'true',
    name: 'Travel, Adventure and beyond',
    membersCount: '2129',
    price: '2000',
  },
  {
    id: '7b576b32-5079-475a-9243-526873564946',
    avatar: '/fixtures/40x40/food.png',
    cover: '/fixtures/256x256/dinner.png',
    description:
      'Get all the help you need making your work-from-home situation a dream come true',
    isMember: 'true',
    name: 'WFH diary',
    membersCount: '293784',
    price: '2500',
  },
  {
    id: '6b576b32-5079-475a-9224-526873564946',
    avatar: '/fixtures/40x40/folder.png',
    cover: '/fixtures/256x256/camera.png',
    description:
      'We share our passion for gardening, tips, techniques, and our experiences growing beautiful, delicious products without leaving home',
    isMember: 'false',
    name: 'Our garden',
    membersCount: '58692',
    price: '1500',
  },
  {
    id: '6b576b32-5079-475a-9253-526871563946',
    avatar: '/fixtures/40x40/settings.png',
    cover: '/fixtures/256x256/battery.png',
    description:
      'Sweet tooth fairy brings weekly recipes that will sweeten your life',
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
