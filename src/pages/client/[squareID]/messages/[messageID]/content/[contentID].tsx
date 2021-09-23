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
const DynamicPage = dynamic<any>(
  () => import('components/common').then((mod) => mod.Page) as any,
  { ssr: false }
);

const DynamicWidgets = dynamic<any>(
  () => import('components/widgets').then((mod) => mod.Widgets) as any,
  { ssr: false }
);

// TODO use react-window
const Content = () => {
  return (
    <>
      <DynamicPage>Messages TODO</DynamicPage>
      <DynamicWidgets />
    </>
  );
};

const ContentPage = () => {
  const { query } = useRouter();

  if (!query.contentID) return null;

  return <Content />;
};

ContentPage.Layout = DynamicLayout;

export default ContentPage;
