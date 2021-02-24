// mui
import { Button, Box, Card, CardContent, Typography } from '@material-ui/core';
import { ReportProblemOutlined as ErrorIcon } from '@material-ui/icons';

interface Props {
  error: {
    message: string;
  };
  onClick: () => void;
}

const ErrorView = ({ error, onClick }: Props) => (
  <Card style={{ height: '100% ' }}>
    <Box alignItems="center" display="flex" justifyContent="center">
      <CardContent>
        <Box alignItems="center" display="flex">
          <ErrorIcon style={{ marginRight: 5 }} />
          <Typography variant="h2">{error.message}</Typography>
        </Box>

        <Box marginTop={4}>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={onClick}
          >
            Retry
          </Button>
        </Box>
      </CardContent>
    </Box>
  </Card>
);

export default ErrorView;
