import * as Sentry from '@sentry/node';

// utils
import { render, screen } from 'utils/tests';

// components
import ErrorPage from 'pages/_error';

// mocks
jest.mock('@sentry/node');

const defaultProps = {
  AppTree: null,
  err: null,
  hasGetInitialPropsRun: false,
  statusCode: 400,
  pathname: '/',
  query: {}
};

const renderComponent = (props = {}) =>
  render(<ErrorPage {...defaultProps} {...props} />);

beforeEach(() => {
  jest.clearAllMocks();
});

test('render correctly', () => {
  renderComponent();

  expect(Sentry.captureException).not.toHaveBeenCalled();
  expect(screen.getByRole('heading', { name: /400/i })).toBeInTheDocument();
  expect(screen.getByText(/bad request/i)).toBeInTheDocument();
});

test('should call capture Exception on normal render', () => {
  const err = 'Custom Error';
  renderComponent({ err });

  expect(Sentry.captureException).toHaveBeenCalledWith(err);
  expect(screen.getByRole('heading', { name: /400/i })).toBeInTheDocument();
  expect(screen.getByText(/bad request/i)).toBeInTheDocument();
});

test('getInitialProps with err', async () => {
  const err = 'Custom Error';
  const response = await ErrorPage.getInitialProps({
    res: {},
    err,
    asPath: '/'
  });

  expect(Sentry.captureException).toHaveBeenCalledWith(err);
  expect(Sentry.flush).toHaveBeenCalledWith(2000);
  expect(response).not.toBeNull();
});

test('getInitialProps no err', async () => {
  const response = await ErrorPage.getInitialProps({
    res: {},
    err: null,
    asPath: '/'
  });

  expect(Sentry.captureException).toHaveBeenCalled();
  expect(Sentry.flush).toHaveBeenCalledWith(2000);
  expect(response).not.toBeNull();
});
