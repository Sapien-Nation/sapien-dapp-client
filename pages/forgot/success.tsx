// components
import { Layout } from 'components/auth';
import { Head } from 'components/common';

// types
import { NextPage } from 'next';

const ForgotSuccessPage: NextPage = () => (
  <>
    <Head title="Check Email" />
    <Layout title="Check Your Email!">
      <p className="text-purple-700">
        Please check your email and follow the instructions to reset your
        password.
      </p>
    </Layout>
  </>
);

export default ForgotSuccessPage;
