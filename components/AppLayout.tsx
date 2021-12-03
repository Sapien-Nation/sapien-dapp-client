import { useRouter } from 'next/router';

// twind
import { tw } from 'twind';

interface Props {
  children: React.ReactElement;
}

const AppLayout = ({ children }: Props) => {
  const { pathname } = useRouter();

  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/logout') ||
    pathname.startsWith('/forgot') ||
    pathname.startsWith('/change-password')
  ) {
    return children;
  }

  return (
    <div className={tw`relative`}>
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
