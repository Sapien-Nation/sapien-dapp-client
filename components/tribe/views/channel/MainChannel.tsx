import { useRouter } from 'next/router';

//components
import { Head } from 'components/common';
import { useTribe } from 'hooks/tribe';

const Empty = () => {
  return (
    <div className="flex justify-center h-full items-center flex-col">
      <img
        src="https://assets.website-files.com/5e51c674258ffe10d286d30a/5e535398d87131adfd0c974a_peep-25.svg"
        alt="Free open source Peep visit https://www.openpeeps.com/"
      />
      <p className="mt-6 text-sm text-white font-semibold">
        Did you know that someone at the Sapien team decided to pick Betty white
        as his historical figure?
      </p>
    </div>
  );
};

const MainChannel = () => {
  const { query } = useRouter();
  const { tribeID } = query;

  const tribe = useTribe(tribeID as string);

  return (
    <>
      <Head title={tribe.name} />
      <h1 className="sr-only">Main Channel for Tribe {tribe.name}</h1>
      <Empty />
    </>
  );
};

export default MainChannel;
