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
      <Layout title="Create your Sapien account">
        <RegisterForm />
      </Layout>
    </>
  );
};

export default RegisterPage;
