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
const DynamicDirectMessages = dynamic<any>(
  () => import('components/DirectMessages').then((mod) => mod.Messages) as any,
  { ssr: false }
);

const MessagePage = () => {
  const { query } = useRouter();

  if (!query.messageID) return null;

  return <DynamicDirectMessages messageID={String(query.messageID)} />;
};

MessagePage.Layout = DynamicLayout;

export default MessagePage;
