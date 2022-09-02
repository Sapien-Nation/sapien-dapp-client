// constants
import { ContentMimeType } from 'tools/constants/content';

// helpers
import { getPlaceholderImageSrc } from 'utils/post';

interface Props {
  title: string;
  mimeType: string;
  body: any;
}

const PostPreview = ({ title, mimeType, body }: Props) => {
  return (
    <div className="flex gap-3 p-2">
      <div className="pt-2">
        <div className="w-20 h-20 bg-gray-500/30 rounded-lg flex justify-center items-center">
          <img src={getPlaceholderImageSrc(mimeType)} alt="" className="p-1" />
        </div>
      </div>
      <div>{title && <h1 className="text-2xl font-semibold">{title}</h1>}</div>
      {mimeType === ContentMimeType.Html && (
        <div
          className="disable-preflight max-h-[250px] overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(180deg,#000 60%,transparent)',
          }}
          dangerouslySetInnerHTML={{
            __html: body,
          }}
        />
      )}
    </div>
  );
};

export default PostPreview;
