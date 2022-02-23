// components
import { Head, Page } from 'components/common';

// types
import type { HomeFeed } from 'tools/types/channel';

interface Props {
  homeFeed: HomeFeed;
}

const HomeFeedView = ({ homeFeed }: Props) => {
  return (
    <>
      <Head title="Home" />
      <Page header={<h2>Header</h2>} footer={<h1>Footer</h1>}>
        <div>children</div>
      </Page>
    </>
  );
};

export default HomeFeedView;
