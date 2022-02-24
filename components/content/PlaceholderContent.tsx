import { tw } from 'twind';

const PlaceholderContent = () => (
  <div
    className={tw`bg-white p-4 ring-1 ring-slate-900/5 rounded-lg shadow-lg max-w-xs w-full h-28`}
  >
    <div className={tw`animate-pulse flex space-x-4`}>
      <div className={tw`rounded-full bg-slate-200 h-10 w-10`}></div>
      <div className={tw`flex-1 space-y-6 py-1`}>
        <div className={tw`h-2 bg-slate-200 rounded`}></div>
        <div className={tw`space-y-3`}>
          <div className={tw`grid grid-cols-3 gap-4`}>
            <div className={tw`h-2 bg-slate-200 rounded col-span-2`}></div>
            <div className={tw`h-2 bg-slate-200 rounded col-span-1`}></div>
          </div>
          <div className={tw`h-2 bg-slate-200 rounded`}></div>
        </div>
      </div>
    </div>
  </div>
);

export default PlaceholderContent;
