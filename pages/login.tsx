// components
import { Layout, LoginForm } from 'components/auth';
import { Head } from 'components/common';

// types
import { NextPage } from 'next';

const LoginPage: NextPage = () => {
  return (
    <>
      <Head title="Access">
        <meta content="Login to your Sapien Account" name="description" />
      </Head>
      <Layout title="Log in">
        <LoginForm />
      </Layout>
    </>
  );
};

export default LoginPage;
