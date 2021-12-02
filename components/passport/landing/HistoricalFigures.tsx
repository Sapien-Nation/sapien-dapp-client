import { SearchIcon } from '@heroicons/react/solid';

// components
import { Dropdown } from 'components/common';

const mockData = [
  {
    id: 1,
    name: 'George Bush',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt:
      'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    people: 334,
  },
  {
    id: 2,
    name: 'John Doe',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt:
      'Olive drab green insulated bottle with flared screw lid and flat top.',
    people: 345,
  },
  {
    id: 3,
    name: 'Galileo Galilei',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt:
      'Person using a pen to cross a task off a productivity paper card.',
    people: 923,
  },
  {
    id: 4,
    name: 'Michael Jordan',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
    people: 546,
  },
];

const HistoricalFigures = () => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="px-4 py-10 flex items-center justify-between sm:px-6 lg:px-0">
          <h1 className="text-2xl font-bold text-gray-900">
            Historical Figures
          </h1>
        </div>
        <div className="px-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between sm:px-6 lg:px-0">
          <div className="flex justify-center max-w-lg w-full lg:max-w-xs">
            <Dropdown />
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative ml-3">
              <input
                id="search"
                name="search"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Search"
                type="search"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <button
              type="button"
              className="shadow-none inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm hover:text-white hover:bg-black focus:outline-none focus:bb-black"
            >
              Show all
            </button>
            <button
              type="button"
              className="shadow-none inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm hover:text-white hover:bg-black focus:outline-none focus:bb-black"
            >
              Politics
            </button>
            <button
              type="button"
              className="shadow-none inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm hover:text-white hover:bg-black focus:outline-none focus:bb-black"
            >
              Sports
            </button>
            <button
              type="button"
              className="shadow-none inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm hover:text-white hover:bg-black focus:outline-none focus:bb-black"
            >
              Art
            </button>
            <button
              type="button"
              className="shadow-none inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm hover:text-white hover:bg-black focus:outline-none focus:bb-black"
            >
              Music
            </button>
          </div>
        </div>
        <div className="relative my-8">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200" />
          </div>
        </div>
        <div className="grid py-7 grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {mockData.map((element) => (
            <a key={element.id} href={element.href} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={element.imageSrc}
                  alt={element.imageAlt}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8">
                <h3>
                  <a href="#">
                    <span aria-hidden="true" className="absolute" />
                    {element.name}
                  </a>
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center px-2.5 py-1.5 border border-green-500 shadow-sm text-xs font-medium rounded text-green-500 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  LOREM IPSUM
                </button>
              </div>
              <div className="flex items-center pt-4">
                <div className="-space-x-1 overflow-hidden">
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                    alt=""
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <span className="ml-2 text-xs text-gray-900">
                  +{element.people} people
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoricalFigures;
