// components
import { Head, Page } from 'components/common';

// types
import type { MainFeedTribe } from 'tools/types/tribe';

interface Props {
  tribe: MainFeedTribe;
}

const HomeFeedView = (_: Props) => {
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
