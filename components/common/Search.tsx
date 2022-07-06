import { SearchIcon } from '@heroicons/react/solid';

interface Props {
  className: string;
  placeholder: string;
}

const Search = (props: Props) => (
  <div className="w-full pl-2">
    <label htmlFor="search" className="sr-only">
      Search
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5" aria-hidden="true" />
      </div>
      <input
        id="search"
        name="search"
        className="block w-full pl-10 pr-3 py-2 border border-sapien-neutral-800 text-white rounded-full bg-gray-800 leading-5 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={props.placeholder}
        type="search"
        autoComplete="off"
        {...props}
      />
    </div>
  </div>
);

export default Search;
