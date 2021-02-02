// utils
import { testImportFormat } from 'utils/format';

const IndexPage: React.FC = () => {
  const response = testImportFormat();

  return (
    <div>
      <h1>Index Page</h1>
      <span>{response}</span>
    </div>
  );
};

export default IndexPage;
