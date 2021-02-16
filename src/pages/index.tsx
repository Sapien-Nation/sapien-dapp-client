/* istanbul ignore file */
// api
import axios from 'api';

// context
import { useAuth } from 'context/user';

const IndexPage: React.FC = () => {
  const { me } = useAuth();

  const handleError = async () => {
    try {
      await axios.post('/api/tribes/error');
    } catch (err) {
      console.log(err);
      //
    }
  };

  return (
    <div>
      <div style={{ borderRadius: '24px', backgroundColor: '#F9F9FA', padding: 40 }}>
        <h1>Index Page</h1>
        {me && <button onClick={handleError}>Try Error</button>}
      </div>
    </div>
  );
};

export default IndexPage;
