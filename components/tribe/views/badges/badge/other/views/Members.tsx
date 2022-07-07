// hooks
import { useTribeBadge } from 'hooks/tribe/badge';

interface Props {
  badgeID: string;
}

const MembersForm = ({ badgeID }: Props) => {
  const badge = useTribeBadge(badgeID);

  if (badge.owners.length === 0) {
    return <h1>This badge has no members associated yet</h1>;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center relative">
        <div className="shadow z-40 w-full lef-0 rounded max-h-select overflow-y-auto">
          <div className="flex flex-col w-full">
            {badge.owners.map((badgeOwner) => {
              return (
                <div
                  key={badgeOwner.id}
                  className="py-2 px-3 cursor-pointer bg-gray-900  border-transparent border-l-2 border-sapien"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {badgeOwner.avatar && (
                        <img
                          className="w-5 h-5 rounded-full flex-shrink-0"
                          src={badgeOwner.avatar}
                          alt={badgeOwner.username}
                        />
                      )}
                      {!badgeOwner.avatar && badgeOwner.username && (
                        <div className="bg-sapien-neutral-200 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center">
                          {badgeOwner.username[0].toUpperCase()}
                        </div>
                      )}
                      {badgeOwner.username}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersForm;
