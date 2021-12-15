import { tw } from 'twind';
import Link from 'next/link';

// components
import { Layout } from 'components/auth';
import { Head } from 'components/common';

// types
import { NextPage } from 'next';

const ForgotSuccessPage: NextPage = () => (
  <>
    <Head title="Check Email" />
    <Layout title="Check Your Inbox">
      <>
        <p className={tw`text-sm mb-6`}>
          Please check your email and follow the instructions to reset your
          password.
        </p>
        <div className={tw`mt-8 text-center`}>
          <Link href="/login">
            <a
              className={tw`mt-8 text-center font-medium text-sm text-purple-600 hover:text-purple-500`}
            >
              Go to Sign in page
            </a>
          </Link>
        </div>
      </>
    </Layout>
  </>
);

export default ForgotSuccessPage;
