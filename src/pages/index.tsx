import { useEffect, useState } from 'react';

// mui
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// components
import Dialog from 'components/dialog';

// utils
import { testImportFormat } from 'utils/format';

const IndexPage: React.FC = () => {
  const response = testImportFormat();

  useEffect(() => {
    // throw new Error('Client Test 3');
  }, []);
  const [isDialogOpen, toggleDialog] = useState(false);
  return (
    <div>
      <h1>Index Page!</h1>
      <span>{response}</span>
      <Button onClick={() => toggleDialog(!isDialogOpen)}>Open dialog</Button>
      <Dialog
        open={isDialogOpen}
        title={<Typography>This is a</Typography>}
        onClose={() => toggleDialog(!isDialogOpen)}
      >
        <Box>This is dialog content</Box>
      </Dialog>
    </div>
  );
};

export default IndexPage;
