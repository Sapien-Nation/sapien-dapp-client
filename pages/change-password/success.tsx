import Link from 'next/link';

// twind
import { tw } from 'twind';

// components
import { Layout } from 'components/auth';
import { Head } from 'components/common';

// types
import { NextPage } from 'next';

const ChangePasswordSuccessPage: NextPage = () => (
  <>
    <Head title="Password Changed" />
    <Layout title="Password Changed!">
      <>
        <p className={tw`text-purple-500`}>
          Please{' '}
          <Link href="/login">
            <a
              className={tw`text-purple-700`}
              style={{ textDecoration: 'underline' }}
            >
              Login
            </a>
          </Link>{' '}
          with your new Password
        </p>
      </>
    </Layout>
  </>
);

export default ChangePasswordSuccessPage;
