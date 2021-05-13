// components
import Layout from './AuthLayout';
import { LoginForm } from 'components/authentication';

// TODO Best way to handle the logo
const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

LoginPage.Layout = Layout;

export default LoginPage;
