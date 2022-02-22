// components
import { Head, Page } from 'components/common';
import Editor from 'components/slate';

// hooks
import { useMainSquare } from 'hooks/tribe';

// types
import type { MainChannel } from 'tools/types/channel';

interface Props {
  mainChannel: MainChannel;
}

const MainChannelView = ({ mainChannel: { name } }: Props) => {
  const { tribeID } = useMainSquare();
  return (
    <>
      <Head title={name} />
      <Page
        header={<h1>Header</h1>}
        footer={<Editor tribeID={tribeID} onSave={() => {}} />}
      >
        <div>children</div>
      </Page>
    </>
  );
};

export default MainChannelView;
