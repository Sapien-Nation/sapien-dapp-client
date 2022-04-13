import _chunk from 'lodash/chunk';
import {
  AcademicCapIcon,
  ChartPieIcon,
  CollectionIcon,
  PlusIcon,
  XIcon,
} from '@heroicons/react/outline';

interface Props {
  onDeposit: () => void;
}

const Home = ({ onDeposit }: Props) => {
  const tokens = [
    {
      id: 1,
      image:
        'https://cdn.discordapp.com/avatars/830575982368522261/0b919832fa0fdbb26caf3f66ecd9ff57.webp?size=40',
    },
    {
      id: 2,
      image:
        'https://cdn.discordapp.com/avatars/148840377300942848/4d88470586b6348336096a43111ec957.webp?size=40',
    },
    {
      id: 3,
      image:
        'https://cdn.discordapp.com/avatars/320412527160721409/9191bcbf4d9cc5ffd4b6a1f0f404438f.webp?size=40',
    },
    {
      id: 4,
      image:
        'https://cdn.discordapp.com/avatars/585441199192539149/909cdb67297d8eb6ec6a672e0a56ea05.webp?size=40',
    },
    {
      id: 5,
      image:
        'https://cdn.discordapp.com/avatars/957050147655782480/5122783447a6c85f168c9dcd04ce6c8f.webp?size=40',
    },
    {
      id: 6,
      image:
        'https://cdn.discordapp.com/avatars/525324420953145346/591a17e49d4d7f43efa2aa0600b85df5.webp?size=40',
    },
    {
      id: 7,
      image:
        'https://cdn.discordapp.com/avatars/314066662775062529/de8f512b5f5f7117c997807d842131f5.webp?size=40',
    },
    {
      id: 8,
      image:
        'https://cdn.discordapp.com/guilds/704809775690678442/users/881207907918704661/avatars/623defcbda87e57b52a2d76475b48db9.webp?size=40',
    },
    {
      id: 9,
      image:
        'https://cdn.discordapp.com/guilds/704809775690678442/users/800513157164302336/avatars/88b528554f2c50a60e1a67863a7d9184.webp?size=40',
    },
    {
      id: 10,
      image:
        'https://cdn.discordapp.com/avatars/519376255309709322/f84f18a8be790712fb1a5b176e095e41.webp?size=40',
    },
    {
      id: 11,
      image:
        'https://cdn.discordapp.com/guilds/704809775690678442/users/129143219991609344/avatars/892cda40422928bde35ae5913bb860dc.webp?size=40',
    },
    {
      id: 12,
      image:
        'https://cdn.discordapp.com/avatars/525324420953145346/591a17e49d4d7f43efa2aa0600b85df5.webp?size=40',
    },
    {
      id: 13,
      image:
        'https://cdn.discordapp.com/avatars/830575982368522261/0b919832fa0fdbb26caf3f66ecd9ff57.webp?size=40',
    },
    {
      id: 14,
      image:
        'https://cdn.discordapp.com/avatars/148840377300942848/4d88470586b6348336096a43111ec957.webp?size=40',
    },
    {
      id: 15,
      image:
        'https://cdn.discordapp.com/avatars/320412527160721409/9191bcbf4d9cc5ffd4b6a1f0f404438f.webp?size=40',
    },
    {
      id: 16,
      image:
        'https://cdn.discordapp.com/avatars/585441199192539149/909cdb67297d8eb6ec6a672e0a56ea05.webp?size=40',
    },
    {
      id: 17,
      image:
        'https://cdn.discordapp.com/avatars/957050147655782480/5122783447a6c85f168c9dcd04ce6c8f.webp?size=40',
    },
    {
      id: 18,
      image:
        'https://cdn.discordapp.com/avatars/525324420953145346/591a17e49d4d7f43efa2aa0600b85df5.webp?size=40',
    },
    {
      id: 19,
      image:
        'https://cdn.discordapp.com/avatars/314066662775062529/de8f512b5f5f7117c997807d842131f5.webp?size=40',
    },
    {
      id: 20,
      image:
        'https://cdn.discordapp.com/guilds/704809775690678442/users/881207907918704661/avatars/623defcbda87e57b52a2d76475b48db9.webp?size=40',
    },
    {
      id: 21,
      image:
        'https://cdn.discordapp.com/guilds/704809775690678442/users/800513157164302336/avatars/88b528554f2c50a60e1a67863a7d9184.webp?size=40',
    },
    {
      id: 22,
      image:
        'https://cdn.discordapp.com/avatars/519376255309709322/f84f18a8be790712fb1a5b176e095e41.webp?size=40',
    },
    {
      id: 23,
      image:
        'https://cdn.discordapp.com/guilds/704809775690678442/users/129143219991609344/avatars/892cda40422928bde35ae5913bb860dc.webp?size=40',
    },
    {
      id: 24,
      image:
        'https://cdn.discordapp.com/avatars/525324420953145346/591a17e49d4d7f43efa2aa0600b85df5.webp?size=40',
    },
  ];

  return (
    <>
      <ol
        className="pt-4 grid gap-4 grid-cols-4 w-72 mx-auto"
        style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
      >
        <li
          className="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center bg-sapien-neutral-600 hover:bg-gray-700"
          onClick={onDeposit}
        >
          <PlusIcon className="w-5 mx-auto text-white" />
        </li>
        {tokens.map((token) => (
          <li
            className="bg-gray-700 hover:bg-gray-50 w-14 h-14 cursor-pointer rounded-full flex justify-center"
            key={token.id}
          >
            <img
              className="rounded-full px-1 py-1 w-14 h-14"
              src={token?.image}
              alt={`image-${token.id}`}
            />
          </li>
        ))}
      </ol>
    </>
  );
};

export default Home;
