import dynamic from 'next/dynamic';

// components
const DynamicLayout = dynamic<any>(
  () => import('components/common').then((mod) => mod.Layout) as any,
  { ssr: false }
);
const DynamicTribeCard = dynamic<any>(
  () => import('components/discovery').then((mod) => mod.TribeCard) as any,
  { ssr: false }
);
const DynamicQuery = dynamic<any>(
  () => import('components/common').then((mod) => mod.Query) as any,
  { ssr: false }
);

// mui
import { Box } from '@material-ui/core';

const DiscoveryPage = () => (
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
      <DynamicQuery api="/api/v3/tribes/discovery">
        {(tribes: Array<any>) => (
          <>
            {tribes.map((tribe: any) => (
              <DynamicTribeCard key={tribe.id} tribe={tribe} />
            ))}
          </>
        )}
      </DynamicQuery>
    </Box>
  </Box>
);

DiscoveryPage.Layout = DynamicLayout;

export default DiscoveryPage;
