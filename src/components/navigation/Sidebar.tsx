import { useState } from 'react';

// next
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

// context
import { useAuth } from 'context/user';

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
  const { asPath } = useRouter();

  if (me === undefined) return null;

  return (
    <nav aria-label="Main navigation" style={{ gridArea: 'sidebar' }}>
      <Query apiUrl="/api/tribes/followed" loader={null}>
        {() => (
          <>
            <TribeBar createTribe={() => setDialog(Dialog.CreateTribe)} />
            {asPath === '/discovery' ? (
              <DiscoverNavigation />
            ) : (
              <TribeNavigation />
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
