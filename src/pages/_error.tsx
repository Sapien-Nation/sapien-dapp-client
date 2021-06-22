// next
import NextErrorComponent from 'next/error';
import { NextPage, NextPageContext } from 'next';

// @ts-ignore
const MyError: NextPage<NextPageContext> = ({
  // @ts-ignore
  statusCode,
}) => {
  return <NextErrorComponent statusCode={statusCode} />;
};

// @ts-ignore
MyError.getInitialProps = async ({ res, err }) => {
  // @ts-ignore
  const errorInitialProps = await NextErrorComponent.getInitialProps({
    res,
    err,
  });

  Object.assign(errorInitialProps, { hasGetInitialPropsRun: true });

  if (err) {
    return errorInitialProps;
  }

  return errorInitialProps;
};

export default MyError;
