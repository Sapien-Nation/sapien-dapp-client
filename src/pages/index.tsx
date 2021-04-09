/* istanbul ignore file */

// constants
import { NavigationTypes } from 'context/tribes';

// context
import { useNavigation } from 'context/tribes';

import Layout from './Layout';
import EditSquare from 'components/tribe/modals/Squares/EditSquare';
import { mockSquare } from 'tools/mocks/square';

const IndexPage = () => {
  const [navigation] = useNavigation();

  const renderView = () => {
    switch (navigation.type) {
      case NavigationTypes.BadgeStore:
        return 'BADGE STORE TODO';
      case NavigationTypes.Channel:
        return 'CHANNELS FEED TODO';
      case NavigationTypes.Discovery:
        return 'DISCOVERY TODO';
      case NavigationTypes.Tribe:
        return 'TRIBES FEED TODO';
    }
  };

  return (
    <Layout>
      <div
        style={{
          borderRadius: '24px',
          backgroundColor: '#F9F9FA',
          padding: 40,
        }}
      >
        <EditSquare
          square={mockSquare({ topics: ['#ethan', '#escareno'] })}
          onClose={() => {}}
        />
        <h1>{renderView()}</h1>
      </div>
    </Layout>
  );
};

export default IndexPage;
