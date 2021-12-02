import { Fragment } from 'react';

// assets
import { FullLogo } from 'assets';

// next
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// hooks
import { useAuth } from 'context/user';

// tailwind ui
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';

// utils
import { mergeClassNames } from 'utils/styles';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Passport', href: '/passport' },
  { name: 'Protocol', href: '/protocol' },
  { name: 'Metaverse', href: '/metaverse' },
  { name: 'Partners', href: '/partners' },
  { name: 'Blog', href: '/blog' },
  { name: 'About Us', href: '/about' },
];

const Navbar = () => {
  const { me } = useAuth();
  const router = useRouter();

  return (
    <Disclosure as="nav" className="relative bg-white shadow z-10">
      {({ open }) => (
        <>
          <div className="max-w-6xl mx-auto py-1 px-2 sm:px-4 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex px-2 lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <FullLogo className="lg:border-r border-gray-300 pr-6" />
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  {navigation.map((nav) => (
                    <Link key={nav.href} href={nav.href}>
                      <a
                        className={mergeClassNames(
                          router.asPath === nav.href
                            ? 'text-gray-900'
                            : 'text-gray-500 hover:text-gray-700',
                          'inline-flex items-center px-1 pt-1 text-sm font-medium'
                        )}
                      >
                        {nav.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-7 lg:flex lg:items-center">
                {/* Profile dropdown */}
                {me === null && (
                  <>
                    <Link href="/login">
                      <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                        Sign in
                      </a>
                    </Link>
                  </>
                )}
                {me && (
                  <>
                    <button className="inline-flex items-center px-4 py-2 border text-sm font-medium rounded-full py-2 px-6 shadow-sm hover:bg-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                      Connect Wallet
                    </button>
                    <Menu as="div" className="relative ml-2 flex-shrink-0">
                      <div>
                        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                          <span className="sr-only">Open user menu</span>
                          {me.avatar ? (
                            <Image
                              alt={me.displayName}
                              src={me.avatar}
                              width={30}
                              height={30}
                              className="h-8 w-8 rounded-full"
                            />
                          ) : (
                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
                              <span className="text-sm font-medium leading-none text-white">
                                {me.displayName[0]}
                              </span>
                            </span>
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/logout">
                                <a
                                  className={mergeClassNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Sign out
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                )}
                {me === undefined && (
                  <div className="animate-pulse flex items-center space-x-2">
                    <div className="h-8 w-32 bg-gray-300 rounded-full"></div>
                    <div className="rounded-full bg-gray-300 h-8 w-8"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((nav) => (
                <Disclosure.Button
                  as="a"
                  href={nav.href}
                  key={nav.href}
                  className={mergeClassNames(
                    router.asPath === nav.href
                      ? 'bg-purple-50 border-purple-500 text-purple-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                >
                  {nav.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              {me ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      {me.avatar ? (
                        <Image
                          alt={me.displayName}
                          src={me.avatar}
                          width={30}
                          height={30}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
                          <span className="text-sm font-medium leading-none text-white">
                            {me.displayName[0]}
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {me.displayName}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {me.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Disclosure.Button className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                      Connect Wallet
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="/logout"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </>
              ) : (
                <div className="space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="/login"
                    className={mergeClassNames(
                      router.asPath === '/login'
                        ? 'bg-purple-50 border-purple-500 text-purple-700'
                        : 'border-transparent  text-gray-500 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-800',
                      'block px-4 py-2 text-base font-medium'
                    )}
                  >
                    Login
                  </Disclosure.Button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
