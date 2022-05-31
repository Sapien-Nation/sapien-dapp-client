import { useRouter } from 'next/router';

// hooks
import { useTribe } from 'hooks/tribe';

// types
import type { TribeBadge } from 'tools/types/tribe';

interface Props {
  badge: TribeBadge;
  onCancel: () => void;
}

const Owner = ({ badge }: Props) => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;
  const { avatar, name } = useTribe(tribeID);

  return (
    <div className="grid">
      <div>
        <h1>Settings</h1>
        <span>{badge.name}</span>
        <span>{badge.description}</span>
        {avatar ? (
          <img
            src={avatar}
            alt={badge.name}
            style={{ borderColor: badge.color }}
            className="w-8 h-8 object-cover rounded-full border-2"
          />
        ) : (
          <div
            className="w-8 h-8 rounded-full bg-gray-700 border-2 font-bold text-black group-hover:text-gray-500 flex items-center justify-center"
            style={{ borderColor: badge.color }}
          >
            {name[0].toUpperCase()}
          </div>
        )}
      </div>

      <div>
        <h1>Owners</h1>
        <ol>
          {badge.owners.map((owner) => {
            <li key={owner.id}>{owner.username}</li>;
          })}
        </ol>
      </div>
    </div>
  );
};

export default Owner;
