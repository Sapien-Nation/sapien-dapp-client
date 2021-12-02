// assets
import { FullLogo } from 'assets';

// tailwind ui
import { ArrowSmRightIcon } from '@heroicons/react/solid';

/* This example requires Tailwind CSS v2.0+ */
const navigation = {
  sapien: [
    { name: 'Orci.', href: '#' },
    { name: 'Donec cursus.', href: '#' },
    { name: 'Urna.', href: '#' },
  ],
  info: [
    { name: 'Urna elit.', href: '#' },
    { name: 'Erat.', href: '#' },
  ],
};

const Footer = () => {
  return (
    <footer
      className="bg-white border-t-2 border-gray-200"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div>
              <FullLogo />
            </div>
            <p className="text-gray-900 text-2xl">
              Urna tincidunt donec vitae viverra.
            </p>
          </div>
          <div className="mt-12 md:grid md:grid-cols-2 gap-8 xl:mt-0 xl:col-span-3">
            <div className="sm:grid sm:grid-cols-2 sm:gap-8">
              <div>
                <h3 className="text-base font-medium text-gray-900 tracking-wider">
                  Sapien
                </h3>
                <ul role="list" className="mt-10 space-y-4">
                  {navigation.sapien.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm font-bold text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 sm:mt-0">
                <h3 className="text-base font-medium text-gray-900 tracking-wider">
                  Info
                </h3>
                <ul role="list" className="mt-10 space-y-4">
                  {navigation.info.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm font-bold text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10 md:mt-0">
              <div>
                <h3 className="text-base font-medium text-gray-900 tracking-wider">
                  Et egestas amet urna.
                </h3>
                <div>
                  <p className="text-gray-900 text-sm mt-10">
                    Faucibus proin viverra in luctus. Sapien quam facilisis
                    facilisis a in turpis id cras est risus elit.
                  </p>
                  <label htmlFor="email" className="sr-only">
                    Type email
                  </label>
                  <div className="relative mt-6">
                    <input
                      id="email"
                      name="email"
                      className="block w-full h-12 px-3 py-2 border border-gray-300 rounded-3xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ArrowSmRightIcon
                        className="h-8 w-8 text-white bg-purple-500 rounded-full"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 sm:flex sm:items-center sm:justify-between text-center">
          <p className="text-xs text-gray-400">
            Copyright &copy; {new Date().getFullYear()} Sapien LLC. All rights
            reserved
          </p>
          <div className="text-xs mt-5 sm:mt-0">
            <p className="text-gray-900 inline-block">
              We use cookies for better service.
            </p>
            <button className="text-purple-500 inline-block">
              &nbsp; Accept
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
