/* istanbul ignore file */
// api
import axios from 'api';

// contants
import { NavigationTypes } from 'context/tribes';

// context
import { useAuth } from 'context/user';
import { useNavigation } from 'context/tribes';

// components
import Layout from './Layout';

const IndexPage = () => {
  const { me } = useAuth();
  const [navigation] = useNavigation();

  const handleError = async () => {
    try {
      await axios.post('/api/tribes/error');
    } catch (err) {
      console.log(err);
      //
    }
  };

  const renderView = () => {
    switch (navigation.type) {
      case NavigationTypes.BadgeStore:
        return 'BADGE STORE TODO';
      case NavigationTypes.Channel:
        return 'CHANNELS FEED TODO';
      case NavigationTypes.Discovery:
        return 'DISCOVERY TODO';
      case NavigationTypes.Tribe:
        return 'TRIBES FEED';
    }
  };

  return (
    <Layout>
      <div style={{ borderRadius: '24px', backgroundColor: '#F9F9FA', padding: 40 }}>
        <h1>{renderView()}</h1>
        {me && <button onClick={handleError}>Try Error</button>}
      </div>
    </Layout>
  );
};

export default IndexPage;
