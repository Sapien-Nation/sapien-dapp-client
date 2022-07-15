import { useRouter } from 'next/router';

// components
import { Layout, ChangePasswordForm } from 'components/auth';

// types
import type { NextPage } from 'next';

interface Props {
  token: string;
}

const ChangePassword = ({ token }: Props) => (
  <Layout title="Change Password">
    <ChangePasswordForm token={token} />
  </Layout>
);

const ChangePasswordPage: NextPage = () => {
  const { query } = useRouter();

  if (!query.token) return null;

  return <ChangePassword token={String(query.token)} />;
};

export default ChangePasswordPage;
