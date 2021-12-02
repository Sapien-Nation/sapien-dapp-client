import { RefreshIcon } from '@heroicons/react/solid';
import { useState, useRef } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { useKeyPressEvent } from 'react-use';

// api
import { replaceFigure, uploadManualFigure } from 'api/passport';

// components
import { AutocompleteInput, SuggestionsList } from 'components/common';

// hooks
import { useToast } from 'context/toast';

const KEY_CODES = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  ENTER: 'Enter',
};

interface Props {
  allowedPassports: number;
  availablePassports: number;
  linkID: string;
}

const mockFigureSearch = [
  {
    name: 'Frida Khalo',
    id: '1',
  },
  {
    name: 'Pancho Villa',
    id: '2',
  },
  {
    name: 'Emiliano Zapata',
    id: '3',
  },
];

const renderLoading = () => (
  <>
    <li className="animate-pulse relative">
      <div className="group block w-full h-72 aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"></div>
    </li>
    <li className="animate-pulse relative">
      <div className="group block w-full h-72 aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"></div>
    </li>
    <li className="animate-pulse relative">
      <div className="group block w-full h-72 aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"></div>
    </li>
    <li className="animate-pulse relative">
      <div className="group block w-full h-72 aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"></div>
    </li>
  </>
);

const HistoricalFiguresSearch = ({ linkID }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState(mockFigureSearch);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [cursor, setCurrentCursor] = useState(null);
  const [manualFigureURL, setManualFigureURL] = useState(false);
  const [refreshedImages, setRefreshedImages] = useState<Array<string>>([]);

  const toast = useToast();
  const { mutate } = useSWRConfig();

  const figureLookupAPIKey = searchTerm
    ? `/api/v3/passport/avatar-lookup?term=${searchTerm}`
    : '';
  const { data: figures, error, isValidating } = useSWR(figureLookupAPIKey);
  const isLoadingFigures = (!error && !figures) || isValidating;

  //--------------------------------------------------------------------------------------------------------------------
  const handleFileUpload = async (file: File) => {
    setIsFetching(true);
    const formData = new FormData();
    formData.append('figure', file);

    try {
      const { url } = await uploadManualFigure(formData);

      setManualFigureURL(url);
    } catch (error) {
      toast({
        message: error,
      });
    }
    setIsFetching(false);
  };

  const handleRefresh = async ({ url }: { url: string }) => {
    setIsFetching(true);
    try {
      const newRefreshedImages = [...refreshedImages, url];
      const newFigure = await replaceFigure({
        term: searchTerm,
        ignoreUrls: [...newRefreshedImages, ...figures!.images],
      });

      setRefreshedImages(newRefreshedImages);
      mutate(
        figureLookupAPIKey,
        (data: any) => ({
          ...data,
          images: data.images.map((image: string) =>
            image === url ? newFigure : image
          ),
        }),
        false
      );
    } catch (error) {
      if (error.code === 204) {
        setRefreshedImages([]);
      }

      toast({
        message: error,
      });
    }
    setIsFetching(false);
  };

  useKeyPressEvent(KEY_CODES.UP, () => {
    if (cursor > 0) {
      setCurrentCursor(cursor - 1);
    } else if (cursor === 0 || cursor === null) {
      setCurrentCursor(mockFigureSearch?.length - 1);
    } else {
      setCurrentCursor(cursor - 1);
    }
  });

  useKeyPressEvent(KEY_CODES.DOWN, () => {
    if (cursor === null) {
      setCurrentCursor(0);
    } else if (cursor >= mockFigureSearch?.length - 1) {
      setCurrentCursor(0);
    } else {
      setCurrentCursor(cursor + 1);
    }
  });

  useKeyPressEvent(KEY_CODES.ENTER, () => {
    inputRef.current.value = suggestions[cursor]?.name;
    inputRef.current.blur();

    setSearchTerm(suggestions[cursor]?.name);
    setShowSuggestions(false);
  });

  const onSuggestionClick = (figure: { name: string; id: string }) => {
    inputRef.current.value = suggestions[cursor]?.name;
    setSearchTerm(figure.name);
    // setFigureSearchTerm('');
  };

  const onSuggestionHover = (cursor: number) => setCurrentCursor(cursor);

  // TO DO just for demo purposes
  const setFigureFilter = (term: string) => {
    if (inputRef.current.value) setShowSuggestions(true);
    const suggestions = mockFigureSearch.filter(({ name }) =>
      name.toLowerCase().includes(term.toLocaleLowerCase())
    );
    setSuggestions(suggestions);
  };
  //--------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <div className="px-4 xl:px-0">
        <h3 className="mt-3 max-w-sm mx-auto font-bold lg:text-2xl sm:text-xl md:mt-5">
          Welcome to the Sapien Tribe!
        </h3>
        <p className="mt-3 max-w-lg mx-auto text-md font-light py-4 text-gray-500 sm:text-xl md:mt-5">
          To claim your passport please input your favorite historical figure.
          Your choice of figure should reflect values your yourself will
          champion as a member of our tribe.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="relative mt-6 max-w-sm w-full">
          <AutocompleteInput
            ref={inputRef}
            // @ts-ignore
            setFigureTerm={setFigureFilter}
            onBlur={() => {
              setShowSuggestions(false);
              setCurrentCursor(null);
            }}
          />
          {showSuggestions && (
            <SuggestionsList
              cursor={cursor}
              suggestions={suggestions}
              onSuggestionClick={onSuggestionClick}
              onSuggestionHover={onSuggestionHover}
            />
          )}
          {/* <Query api="/api/v3/passport/figure-lookup">
            {(figuresOptions: Array<{ name: string; id: string }>) => (
              <h1>TODO autocomplete</h1>
            )}
          </Query> */}
        </div>
      </div>
      {searchTerm && (
        <main className="lg:relative">
          <div className="mx-auto max-w-6xl w-full pt-16 px-4 xl:px-0">
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
              {isLoadingFigures
                ? renderLoading()
                : figures?.images.map((image, index) => (
                    <li
                      key={index}
                      className="relative"
                      onClick={() => handleRefresh({ url: image })}
                    >
                      <div className="group flex cursor-pointer	justify-center items-center w-full h-72 aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                        <button className="text-white z-10 absolute opacity-0 group-hover:opacity-100">
                          <RefreshIcon
                            className={
                              isFetching ? `animate-spin h-5 w-5` : `h-5 w-5`
                            }
                          />
                        </button>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image}
                          alt="Figure"
                          className="object-cover h-full w-full pointer-events-none group-hover:opacity-75"
                          onError={(event) => {
                            (event.target as HTMLImageElement).src =
                              'https://d151dmflpumpzp.cloudfront.net/images/tribes/default_temp.jpeg';
                          }}
                        />
                      </div>
                    </li>
                  ))}
            </ul>
            <div className="mt-10 flex flex-col justify-center items-center">
              <div className="rounded-full shadow mt-14 mb-6">
                <button
                  disabled={isLoadingFigures || isFetching}
                  type="button"
                  className={`flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 ${
                    isFetching || isLoadingFigures
                      ? 'pointer-events-none cursor-not-allowed'
                      : ''
                  }`}
                >
                  Continue
                </button>
              </div>
              <div>
                or{' '}
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Browse</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>{' '}
                files to upload your own image
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default HistoricalFiguresSearch;
