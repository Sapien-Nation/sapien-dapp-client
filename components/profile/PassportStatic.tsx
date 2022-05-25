import { useState } from 'react';

// components
import PassportForm from './PassportForm';

const PassportStatic = () => {
  const [showPassport, setShowPassport] = useState(false);

  return (
    <div
      className="py-20 px-12 transform"
      style={{
        backgroundImage: `url('/images/passport_background_transparent.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center center',
      }}
    >
      <PassportForm setShowPassport={setShowPassport} />
    </div>
  );
};

export default PassportStatic;
