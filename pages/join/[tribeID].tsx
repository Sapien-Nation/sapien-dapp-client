import { useRouter } from 'next/router';
import { useState } from 'react';

// api
import { joinTribe } from 'api/tribe';
import { useAuth } from 'context/user';
import { Head, Query, Redirect } from 'components/common';

// types
import type { TribeInvite } from 'tools/types/tribe';

enum View {
  Error,
  Join,
}

interface Props {
  tribe: TribeInvite;
}

const Join = ({ tribe }: Props) => {
  const [view, setView] = useState<View>(View.Join);

  const { push } = useRouter();

  const handleJoin = async () => {
    try {
      await joinTribe(tribe.id);
      push(`/tribes/${tribe.id}/home`);
    } catch (err) {
      setView(View.Error);
    }
  };

  const renderView = () => {
    switch (view) {
      case View.Error:
        return (
          <p className="mt-6 text-xl text-white font-semibold">Error View</p>
        );
      case View.Join:
        return (
          <p className="mt-6 text-xl text-white font-semibold">
            <button onClick={handleJoin}>Join Invite</button>
          </p>
        );
    }
  };

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
        {renderView()}
      </div>
    </div>
  );
};

const JoinProxy = () => {
  const { me } = useAuth();
  const { query } = useRouter();

  if (me === null) {
    return (
      <>
        <Head title="" />
        <Redirect path="/login" />
      </>
    );
  }

  if (!query.tribeID) return null;

  return (
    <>
      <Head title="Accept invite" />
      <Query api={`/api/v3/tribe/${query.tribeID as string}/invite`}>
        {(tribe: TribeInvite) => <Join tribe={tribe} />}
      </Query>
    </>
  );
};
export default JoinProxy;
