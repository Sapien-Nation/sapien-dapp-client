// components
import { Layout, ForgotPasswordForm } from 'components/auth';
import { SEO } from 'components/common';

// types
import { NextPage } from 'next';

const ForgotPage: NextPage = () => (
  <>
    <SEO title="Recover Access" />
    <Layout title="Reset your password">
      <>
        <p className="text-sm mb-6">
          Enter the email address associated with your account and we will send
          you a link to reset your password.
        </p>
        <ForgotPasswordForm />
      </>
    </Layout>
  </>
);

export default ForgotPage;
