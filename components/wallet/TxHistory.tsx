import { tw } from 'twind';
import { ExternalLinkIcon } from '@heroicons/react/outline';

const TxHistory = () => {
  return (
    <div className={tw`flex gap-2 justify-between items-center p-6`}>
      <div className={tw`bg-red-50 p-4 rounded-full`}>
        <svg
          fill="none"
          height="14"
          viewBox="0 0 14 14"
          width="14"
          xmlns="http://www.w3.org/2000/svg"
          style={{ fill: 'rgb(255, 66, 121)', transform: 'rotate(180deg)' }}
        >
          <path
            clipRule="evenodd"
            d="M11.9659 0H1.49574C0.677756 0 0 0.646127 0 1.42594V7.12968C0 7.90949 0.677756 8.55562 1.49574 8.55562H5.54395V7.48616H2.61754C2.61754 6.70635 1.93978 6.06023 1.1218 6.06023V2.49539C1.93978 2.49539 2.61754 1.84926 2.61754 1.06945H10.8441C10.8441 1.84926 11.5219 2.49539 12.3398 2.49539V6.06023C11.5219 6.06023 10.8441 6.70635 10.8441 7.48616H7.91953V8.55562H11.9659C12.7839 8.55562 13.4616 7.90949 13.4616 7.12968V1.42594C13.4616 0.646127 12.7839 0 11.9659 0ZM7.91953 5.07666V5.92702C8.33479 5.53463 8.60049 4.9414 8.60049 4.27781C8.60049 3.09695 7.75914 2.1389 6.73082 2.1389C5.7025 2.1389 4.86115 3.09695 4.86115 4.27781C4.86115 4.94238 5.12763 5.53638 5.54395 5.92875V5.07666C5.54395 4.42066 6.07574 3.88887 6.73174 3.88887C7.38774 3.88887 7.91953 4.42066 7.91953 5.07666ZM7.13132 13.8471L10.1375 10.8494C10.347 10.6309 10.347 10.3031 10.1375 10.1064C9.90481 9.88786 9.55572 9.90971 9.34627 10.1064L7.29423 12.1644V5.19115C7.29423 4.90705 7.03823 4.66667 6.73568 4.66667C6.43314 4.66667 6.17713 4.90705 6.17713 5.19115V12.1644L4.1251 10.1064C3.91564 9.90971 3.56655 9.88786 3.33382 10.1064C3.12437 10.3031 3.10109 10.6309 3.33382 10.8494L6.34004 13.8471C6.43314 13.9345 6.57277 14.0001 6.73568 14.0001C6.89859 14.0001 7.03823 13.9345 7.13132 13.8471Z"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>

      <div className={tw`flex flex-col`}>
        <span className={tw`font-bold`}>Purchase</span>
        <span className={tw`text-gray-400`}>14 days, confirmed</span>
      </div>
      <div className={tw`flex items-center gap-3`}>
        <div className={tw`flex flex-col`}>
          <span className={tw`font-bold`}>0 SPN</span>
          <span className={tw`text-gray-400`}>$ 0</span>
        </div>
        <ExternalLinkIcon className={tw`h-5 w-5 text-gray-400`} />
      </div>
    </div>
  );
};

export default TxHistory;
