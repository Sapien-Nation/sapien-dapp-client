// components
import { Layout, RegisterForm } from 'components/auth';
import { Head } from 'components/common';

// types
import { NextPage } from 'next';

const RegisterPage: NextPage = () => {
  return (
    <>
      <Head title="Access">
        <meta content="Register to your Sapien Account" name="description" />
      </Head>
      <Layout title="Log in">
        <RegisterForm />
      </Layout>
    </>
  );
};

export default RegisterPage;
