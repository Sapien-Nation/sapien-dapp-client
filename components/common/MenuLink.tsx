import { forwardRef } from 'react';
import Link from 'next/link';

const MenuLink = forwardRef((props, ref) => {
  // @ts-ignore
  let { href, children, ...rest } = props;
  return (
    <Link href={href}>
      {/* @ts-ignore */}
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});
MenuLink.displayName = 'MenuLink';

export default MenuLink;
