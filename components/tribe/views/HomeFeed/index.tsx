// components
import { DefaultCover, Head, Header, Page } from 'components/common';

// types
import type { MainFeedTribe } from 'tools/types/tribe';

interface Props {
  tribe: MainFeedTribe;
}

const HomeFeedView = ({ tribe }: Props) => {
  return (
    <>
      <Head title="Home" />
      <Page
        header={
          tribe.cover ? (
            <Header alt={tribe.name} src={tribe.cover} />
          ) : (
            <DefaultCover name={tribe.name} />
          )
        }
      >
        <div>children</div>
      </Page>
    </>
  );
};

export default HomeFeedView;
