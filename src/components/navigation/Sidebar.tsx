import { useState } from 'react';

// types
import type { Tribe } from 'types/tribe';

// next
import dynamic from 'next/dynamic';

// constants
import { NavigationTypes } from 'context/tribes';

// context
import { useAuth } from 'context/user';
import { useNavigation } from 'context/tribes';

// components
const CreateChannel = dynamic<any>(
  () => import('components/tribe/modals').then((mod) => mod.CreateChannel),
  {
    ssr: false,
  }
);
const CreateTribe = dynamic<any>(
  () => import('components/tribe/modals').then((mod) => mod.CreateTribe),
  {
    ssr: false,
  }
);
import TribeBar from 'components/navigation/TribeBar';
import {
  DiscoverNavigation,
  TribeNavigation,
} from 'components/navigation/TribeNavigation';
import Query from 'components/query';

export enum Dialog {
  CreateChannel,
  CreateTribe,
}

const Sidebar = () => {
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const { me } = useAuth();
  const [navigation] = useNavigation();

  if (me === undefined) return null;

  return (
    <nav aria-label="Main navigation" style={{ gridArea: 'sidebar' }}>
      <Query apiUrl="/api/tribes/followed" loader={null}>
        {({ tribes }: { tribes: Array<Tribe> }) => (
          <>
            <TribeBar
              createTribe={() => setDialog(Dialog.CreateTribe)}
              tribes={tribes}
            />
            {navigation?.type === NavigationTypes.Discovery ? (
              <DiscoverNavigation />
            ) : (
              <TribeNavigation
                createChanel={() => setDialog(Dialog.CreateChannel)}
                tribes={tribes}
              />
            )}

            {dialog === Dialog.CreateTribe && (
              <CreateTribe onClose={() => setDialog(null)} />
            )}

            {dialog === Dialog.CreateChannel && (
              <CreateChannel onClose={() => setDialog(null)} />
            )}
          </>
        )}
      </Query>
    </nav>
  );
};

export default Sidebar;
