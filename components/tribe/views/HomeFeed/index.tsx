// components
import { Head, Header, Page } from 'components/common';
import Editor from 'components/slate';

// hooks
import { useMainSquare } from 'hooks/tribe';

// types
import type { HomeFeed } from 'tools/types/channel';

interface Props {
  homeFeed: HomeFeed;
}

const HomeFeedView = ({ homeFeed: { name } }: Props) => {
  const { tribeID } = useMainSquare();
  return (
    <>
      <Head title={name} />
      <Page
        // header={<Header alt={name} src={avatarOriginal} />}
        header={<h2>Header</h2>}
        footer={<Editor tribeID={tribeID} onSave={() => {}} />}
      >
        <div>children</div>
      </Page>
    </>
  );
};

export default HomeFeedView;
