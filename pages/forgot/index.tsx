// components
import { Layout, ForgotPasswordForm } from 'components/auth';
import { Head } from 'components/common';

// types
import { NextPage } from 'next';

const ForgotPage: NextPage = () => (
  <>
    <Head title="Recover Access" />
    <Layout title="Forgot Password?">
      <ForgotPasswordForm />
    </Layout>
  </>
);

export default ForgotPage;
