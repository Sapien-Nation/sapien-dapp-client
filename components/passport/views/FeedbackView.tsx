// components
import { LottiePlayer } from 'components/common';

interface Props {
  code: number;
}

const ErrorView = ({ code }: Props) => {
  const renderMessage = () => {
    switch (code) {
      case 409:
        return 'There is already a Passport linked to this account';
      case 403:
        return 'No more passports available for this link, please try a new one';
      case 404:
        return 'Invalid Link';
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="lg:relative py-12 lg:h-full sm:h-72">
        <div className="w-full py-12 h-64 flex items-center justify-center">
          <LottiePlayer lottie="https://assets2.lottiefiles.com/packages/lf20_8gd5woxm.json" />
        </div>
        <div className=" w-full pb-16 text-center">
          <h2 className="w-full text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {renderMessage()}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ErrorView;
