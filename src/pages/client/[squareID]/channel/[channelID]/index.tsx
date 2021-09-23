import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

// components
const DynamicLayoutSkeleton = dynamic<any>(
  () => import('components/common').then((mod) => mod.LayoutSkeleton) as any,
  { ssr: false }
);
const DynamicLayout = dynamic<any>(
  () => import('components/common').then((mod) => mod.LayoutWithWidgets) as any,
  { ssr: false, loading: () => <DynamicLayoutSkeleton /> }
);
const DynamicChannel = dynamic<any>(
  () => import('components/channel').then((mod) => mod.Channel) as any,
  { ssr: false }
);

const ChannelPage = () => {
  const { query } = useRouter();

  if (!query.channelID) return null;

  return <DynamicChannel channelID={String(query.channelID)} />;
};

ChannelPage.Layout = DynamicLayout;

export default ChannelPage;
