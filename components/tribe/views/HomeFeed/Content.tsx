import { tw } from 'twind';
const Content = ({ avatar, createdAt, content, userName }) => (
  <div className={tw`flex text-sm text-gray-500 space-x-4`}>
    <div className={tw`flex-none py-10`}>
      <img
        src={avatar}
        alt=""
        className={tw`w-10 h-10 bg-gray-100 rounded-full`}
      />
    </div>
    <div className={tw`py-10`}>
      <h3 className={tw`font-medium text-gray-900`}>{userName}</h3>
      <p>
        <time dateTime={createdAt}>{createdAt}</time>
      </p>
      <div
        className={tw`mt-4 prose prose-sm max-w-none text-gray-500`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  </div>
);

export default Content;
