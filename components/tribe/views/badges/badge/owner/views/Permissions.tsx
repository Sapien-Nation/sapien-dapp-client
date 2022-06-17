import { useRouter } from 'next/router';

// hooks
import { useTribeRooms } from 'hooks/tribe';

const Permissions = () => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;
  const tribeRooms = useTribeRooms(tribeID);
  return (
    <div className="w-full">
      <div className="flex flex-col items-center relative">
        <div className="w-full">
          <div className="p-1 flex border border-sapien-neutral-400 bg-sapien-neutral-500 placeholder-sapien-neutral-200 rounded">
            <div className="flex flex-auto flex-wrap">
              {tribeRooms.map((room) => {
                return (
                  <div
                    key={room.id}
                    className="flex justify-center items-center m-1 font-medium py-1 px-4  rounded-full text-primary-700 bg-[#6200ea] border border-primary-300 "
                  >
                    <div className="text-xs text-white font-semibold mr-2 leading-none max-w-full flex-initial">
                      {room.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="shadow z-40 w-full lef-0 rounded max-h-select overflow-y-auto">
          <div className="flex flex-col w-full">
            {tribeRooms.map((room) => {
              return (
                <div
                  key={room.id}
                  className="py-2 px-3 cursor-pointer bg-gray-900 hover:bg-gray-800 border-transparent border-l-2 border-sapien"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">{room.name}</div>
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

export default Permissions;
