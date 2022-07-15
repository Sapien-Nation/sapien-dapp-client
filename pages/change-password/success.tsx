import Link from 'next/link';

// components
import { Layout } from 'components/auth';

// types
import { NextPage } from 'next';

const ChangePasswordSuccessPage: NextPage = () => (
  <Layout title="Password Changed!">
    <>
      <p className="text-purple-500 text-center">
        Please{' '}
        <Link href="/login">
          <a
            className="text-purple-700"
            style={{ textDecoration: 'underline' }}
          >
            Login
          </a>
        </Link>{' '}
        with your new Password
      </p>
    </>
  </Layout>
);

export default ChangePasswordSuccessPage;
