// components
import { Layout, LoginForm } from 'components/auth';

// types
import { NextPage } from 'next';

const LoginPage: NextPage = () => {
  return (
    <Layout title="Log in">
      <LoginForm />
    </Layout>
  );
};

export default LoginPage;
