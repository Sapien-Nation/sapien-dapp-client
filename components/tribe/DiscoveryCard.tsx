// types
import type { DiscoveryTribe } from 'tools/types/tribe';

interface Props {
  tribe: DiscoveryTribe;
}

const DiscoveryCard = ({ tribe }: Props) => {
  return (
    <div className="rounded-xl p-5 max-w-sm bg-sapien-neutral-600">
      <div>
        <div
          className="shadow-md rounded-lg"
          style={{ position: 'relative', minHeight: '100px' }}
        >
          <img
            className="w-full rounded-xl -mb-16 flex-shrink-0"
            src={
              tribe.cover ||
              'https://data.pixiz.com/output/user/frame/preview/400x400/9/2/2/1/2071229_96fa2.jpg'
            }
            alt=""
          />
        </div>
        <div className="relative">
          <div className="px-3 py-3">
            <img
              className="w-20 h-20 ml-4 rounded-xl flex-shrink-0"
              src={
                tribe.avatar ||
                'https://cdn.discordapp.com/avatars/488565611941593099/afef69595140eacb65e90eeea0febd07.webp?size=240'
              }
              alt=""
              onError={(event) => {
                (event.target as HTMLImageElement).src =
                  'https://assets.website-files.com/5e51c674258ffe10d286d30a/5e535652f5fa1ac5ecf7d744_peep-40.svg';
              }}
            />
          </div>
        </div>
        <div className="p-3">
          <div className="text-lg font-bold">{tribe.name}</div>
          <div className="text-gray-400">{tribe.description}</div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>{tribe.membersCount} Members</div>
        <button className="w-40 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-primary-200 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
          Join Tribe
        </button>
      </div>
    </div>
  );
};

export default DiscoveryCard;
