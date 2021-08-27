import dynamic from 'next/dynamic';

// components
const DynamicLayout = dynamic(
  () => import('components/common').then((mod) => mod.Layout) as any,
  { ssr: false }
);
const DynamicRedirect = dynamic<any>(
  () => import('components/common').then((mod) => mod.Redirect) as any,
  { ssr: false }
);

const IndexPage = () => <DynamicRedirect to="/client/sapien" />;

IndexPage.Layout = DynamicLayout;

export default IndexPage;
