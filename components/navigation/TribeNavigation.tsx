import { UserGroupIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

// hooks
import { useTribe } from 'hooks/tribe';

// utils
import { mergeClassNames } from 'utils/styles';

const TribeNavigation = () => {
  const { asPath, query } = useRouter();
  const { tribeID } = query;

  const { name } = useTribe(tribeID as string);

  return (
    <>
      <div className="w-full">
        <div>
          <nav>
            <ul>
              <li>
                <span
                  className={mergeClassNames(
                    asPath === `/tribes/${tribeID}/home`
                      ? 'font-extrabold'
                      : '',
                    'relative mt-2 w-full cursor-pointer tracking-wide items-center uppercase font-medium text(sm gray-500) px-4 py-2 flex rounded-lg focus:outline-none'
                  )}
                >
                  <UserGroupIcon className="h-5 w-5 mr-4" />
                  {name}
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default TribeNavigation;
