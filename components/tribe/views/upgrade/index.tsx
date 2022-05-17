// context
import { useAuth } from 'context/user';

const UpgradeView = () => {
  const { me } = useAuth();

  // TODO
  // We need to check if this tribe has been already upgraded, so we show a message
  // We need to check if the current user is admin and can upgrade
  const haveAPassportSigned = me.passport?.status === PassportStatus.S;

  if (haveAPassportSigned === false) {
    return <h1>Wallet Tokens to sign passport</h1>;
  }

  return <div>Upgrade Logic</div>;
};

export default UpgradeView;
