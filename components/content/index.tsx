import { tw } from 'twind';

// components
import Header from './Header';

const ContentItem = () => {
  return (
    <div className={tw`w-full max-w-4xl rounded-2xl bg-white px-6 py-4`}>
      <Header />
    </div>
  );
};

export default ContentItem;
