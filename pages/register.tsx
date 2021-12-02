// components
import { Layout, RegisterForm } from 'components/auth';
import { Head } from 'components/common';

// types
import { NextPage } from 'next';

const RegisterPage: NextPage = () => (
  <>
    <Head title="Sign up">
      <meta
        content="Come an join Sapien for a new Adventure"
        name="description"
      />
    </Head>
    <Layout title="Sign up">
      <RegisterForm />
    </Layout>
  </>
);

export default RegisterPage;
