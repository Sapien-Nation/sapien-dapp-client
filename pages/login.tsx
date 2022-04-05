// components
import { Layout, LoginForm } from 'components/auth';
import { SEO } from 'components/common';

// types
import { NextPage } from 'next';

const LoginPage: NextPage = () => {
  return (
    <>
      <SEO title="Access" />
      <Layout title="Log in">
        <LoginForm />
      </Layout>
    </>
  );
};

export default LoginPage;
