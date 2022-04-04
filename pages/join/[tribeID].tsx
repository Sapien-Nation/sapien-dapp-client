import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';

// api
import { joinTribe } from 'api/tribe';

// types
import type { ProfileTribe } from 'tools/types/tribe';

enum View {
  Error,
  Joining,
}

interface Props {
  tribeID: string;
}

const Join = ({ tribeID }: Props) => {
  const [view, setView] = useState<View>(View.Joining);

  const { push } = useRouter();
  const { mutate } = useSWRConfig();

  const renderView = () => {
    switch (view) {
      case View.Error:
        return (
          <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden  h-full w-full">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
                alt="People working on laptops"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
            </div>
            <div className="px-4 py-4 bottom-0 absolute w-full text-center">
              <p className="mt-6 text-xl text-white font-semibold">
                Error View
              </p>
            </div>
          </div>
        );
      case View.Joining:
        return (
          <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden  h-full w-full">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
                alt="People working on laptops"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
            </div>
            <div className="px-4 py-4 bottom-0 absolute w-full text-center">
              <p className="mt-6 text-xl text-white font-semibold">
                Joining Tribe
              </p>
            </div>
          </div>
        );
    }
  };

  useEffect(() => {
    const handleJoin = async () => {
      try {
        const response = await joinTribe(tribeID);
        mutate(
          '/api/v3/profile/tribes',
          (tribes: Array<ProfileTribe>) => [
            tribes[0],
            response,
            ...tribes.slice(1),
          ],
          false
        );
        push(`/tribes/${tribeID}/home`);
      } catch (err) {
        setView(View.Error);
      }
    };

    handleJoin();
  }, [mutate, push, tribeID]);

  return <div>{renderView()}</div>;
};

const JoinProxy = () => {
  const { query } = useRouter();

  if (!query.tribeID) return null;

  return <Join tribeID={query.tribeID as string} />;
};
export default JoinProxy;
