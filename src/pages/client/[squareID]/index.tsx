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
const DynamicSquare = dynamic<any>(
  () => import('components/square').then((mod) => mod.Square) as any,
  { ssr: false }
);

const SquarePage = () => {
  const { query } = useRouter();

  if (!query.squareID) return null;

  return <DynamicSquare squareID={String(query.squareID)} />;
};

SquarePage.Layout = DynamicLayout;

export default SquarePage;
