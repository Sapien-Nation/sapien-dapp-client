import { useState } from 'react';

// types
import type { Tribe } from 'types/tribe';

// next
import dynamic from 'next/dynamic';

// context
import { useAuth } from 'context/user';

// components
const CreateTribeModal = dynamic(
  () => import('components/tribe/modals').then((mod) => mod.CreateTribeModal),
  {
    ssr: false
  }
);

import TribeBar from 'components/navigation/TribeBar';
import TribeNavigation from 'components/navigation/TribeNavigation';
import Query from 'components/query';

export enum Dialog {
  CreateTribe,
  DiscoverTribes
}

const Sidebar: React.FC = () => {
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const { me } = useAuth();

  if (me === null) return null;

  return (
    <div style={{ gridArea: 'sidebar' }}>
      <Query apiUrl="/api/tribes/followed" loader={null}>
        {({ tribes }: { tribes: Array<Tribe> }) => (
          <>
            <TribeBar
              setShowCreateTribeModal={() => setDialog(Dialog.CreateTribe)}
              tribes={tribes}
            />
            <TribeNavigation />
            {dialog === Dialog.CreateTribe && (
              <CreateTribeModal onClose={() => setDialog(null)} />
            )}
          </>
        )}
      </Query>
    </div>
  );
};

export default Sidebar;
