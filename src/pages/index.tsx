import { useEffect } from 'react';

// utils
import { testImportFormat } from 'utils/format';

const IndexPage: React.FC = () => {
  const response = testImportFormat();

  useEffect(() => {
    // throw new Error('Client Test 3');
  }, []);

  return (
    <div>
      <h1>Index Page</h1>
      <span>{response}</span>
    </div>
  );
};

export default IndexPage;
