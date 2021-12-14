// components
import { Layout, LoginForm } from 'components/auth';
import { Head } from 'components/common';

// types
import { NextPage } from 'next';

const LoginPage: NextPage = () => {
  return (
    <>
      <Head title="Access" />
      <Layout title="Log in">
        <LoginForm />
      </Layout>
    </>
  );
};

export default LoginPage;
