import { useState } from 'react';

// types
import type { Tribe } from 'tools/types/tribe';

// next
import dynamic from 'next/dynamic';

// constants
import { NavigationTypes } from 'context/tribes';

// context
import { useAuth } from 'context/user';
import { useNavigation } from 'context/tribes';

// components
const CreateTribe = dynamic<any>(() => import('components/tribe/CreateTribe'), {
  ssr: false,
});
import TribeBar from 'components/navigation/TribeBar';
import {
  DiscoverNavigation,
  TribeNavigation,
} from 'components/navigation/TribeNavigation';
import Query from 'components/query';

export enum Dialog {
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
              <TribeNavigation tribes={tribes} />
            )}
          </>
        )}
      </Query>
      {dialog === Dialog.CreateTribe && (
        <CreateTribe onClose={() => setDialog(null)} />
      )}
    </nav>
  );
};

export default Sidebar;
