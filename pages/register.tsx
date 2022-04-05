// components
import { Layout, RegisterForm } from 'components/auth';
import { SEO } from 'components/common';

// types
import { NextPage } from 'next';

const RegisterPage: NextPage = () => {
  return (
    <>
      <SEO title="Access" />
      <Layout title="Create your Sapien account">
        <RegisterForm />
      </Layout>
    </>
  );
};

export default RegisterPage;
