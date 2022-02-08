import { tw } from 'twind';
import { useRouter } from 'next/router';

// components
import Editor from 'components/slate';

interface Props {
  children: React.ReactElement;
  header: string;
}

const LayoutSlate = ({ children, header }: Props) => {
  const { query } = useRouter();
  const { tribeID } = query;
  return (
    <>
      <div className={tw`min-h-screen flex px-4`}>
        <div className={tw`flex-1 flex flex-col`}>
          <div className={tw`mx-auto w-full`}>
            <div>
              <h2 className={tw`mt-6 text-3xl font-extrabold text-gray-900`}>
                {header}
              </h2>
            </div>

            <div className={tw`mt-8`}>
              <div className={tw`mt-6`}>{children}</div>
            </div>
            <div className={tw`flex justify-center`}>
              <Editor tribeID={tribeID} onSave={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutSlate;
