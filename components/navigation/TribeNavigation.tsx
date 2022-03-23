import { UserGroupIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { tw } from 'twind';

// hooks
import { useTribe } from 'hooks/tribe';

const TribeNavigation = () => {
  const { asPath, query } = useRouter();
  const { tribeID } = query;

  const { name } = useTribe(tribeID as string);

  return (
    <>
      <div className={tw`w-full`}>
        <div>
          <nav>
            <ul>
              <li>
                <span
                  className={tw`relative mt-2 w-full cursor-pointer tracking-wide items-center uppercase font-medium text(sm gray-500) px-4 py-2 flex rounded-lg focus:outline-none ${
                    asPath === `/tribes/${tribeID}/home` ? 'font-extrabold' : ''
                  }`}
                >
                  <UserGroupIcon className={tw`h-5 w-5 mr-4`} />
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
