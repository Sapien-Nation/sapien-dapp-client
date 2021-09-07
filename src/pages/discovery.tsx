import dynamic from 'next/dynamic';
import { useState } from 'react';

// components
const DynamicLayout = dynamic<any>(
  () => import('components/common').then((mod) => mod.Layout) as any,
  { ssr: false }
);
const DynamicTribeCard = dynamic<any>(
  () => import('components/discovery').then((mod) => mod.TribeCard) as any,
  { ssr: false }
);
const DynamicDiscoverySkeleton = dynamic<any>(
  () => import('components/common').then((mod) => mod.DiscoverySkeleton) as any,
  { ssr: false }
);
const DynamicQuery = dynamic<any>(
  () => import('components/common').then((mod) => mod.Query) as any,
  { ssr: false }
);
const DynamicJoinTribe = dynamic<any>(
  () => import('components/tribe').then((mod) => mod.JoinTribeModal) as any,
  { ssr: false }
);

// mui
import { Box } from '@material-ui/core';

const DiscoveryPage = () => {
  const [showJoinTribe, setShowJoinTribe] = useState<any>(null);
  return (
    <Box
      className="card--rounded-gray"
      marginTop={12.7}
      paddingX={2.8}
      paddingY={4}
    >
      <Box
        display="grid"
        style={{
          gap: '1.6rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(32rem, 34.1rem))',
        }}
      >
        <DynamicQuery
          api="/api/v3/tribes/discovery"
          loader={<DynamicDiscoverySkeleton />}
        >
          {(tribes: Array<any>) => (
            <>
              {tribes.map((tribe: any) => (
                <DynamicTribeCard
                  key={tribe.id}
                  setShowJoinTribe={setShowJoinTribe}
                  tribe={tribe}
                />
              ))}
            </>
          )}
        </DynamicQuery>
        {Boolean(showJoinTribe) && (
          <DynamicJoinTribe
            tribe={showJoinTribe}
            onClose={() => setShowJoinTribe(null)}
          />
        )}
      </Box>
    </Box>
  );
};

DiscoveryPage.Layout = DynamicLayout;

export default DiscoveryPage;
