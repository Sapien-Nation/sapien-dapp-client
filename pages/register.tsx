// components
import { Layout, RegisterForm } from 'components/auth';

// types
import { NextPage } from 'next';

const RegisterPage: NextPage = () => {
  return (
    <Layout title="Create your Sapien account">
      <RegisterForm />
    </Layout>
  );
};

export default RegisterPage;
