import { forwardRef } from 'react';
import Link from 'next/link';

// types
import type { LinkProps } from 'next/link';

interface Props extends LinkProps {
  children: React.ReactNode;
  className: string;
}

const MenuLink = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  let { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});
MenuLink.displayName = 'MenuLink';

export default MenuLink;
