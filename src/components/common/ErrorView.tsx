// mui
import { Button, Box, Card, CardContent, Typography } from '@material-ui/core';
import { ReportProblemOutlined as ErrorIcon } from '@material-ui/icons';

interface Props {
  error: {
    message: string;
  };
  onClick?: () => void;
  resetErrorBoundary?: () => void;
}

const ErrorView = ({
  error,
  onClick,
  resetErrorBoundary = onClick ||
    (() => {
      if (process.browser) {
        return window.location.reload();
      }
      return null;
    }),
}: Props) => (
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
            aria-label="Retry loading page"
            color="primary"
            variant="contained"
            onClick={resetErrorBoundary}
          >
            Retry
          </Button>
        </Box>
      </CardContent>
    </Box>
  </Card>
);

export default ErrorView;
