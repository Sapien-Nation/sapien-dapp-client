import { useState } from 'react';

// components
import PassportForm from './PassportForm';

const PassportStatic = () => {
  const [showPassport, setShowPassport] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <img
        alt="Passport"
        className="absolute w-[690px] cover -z-10"
        src="/images/passport_background_transparent.png"
      />
      <PassportForm setShowPassport={setShowPassport} />
    </div>
  );
};

export default PassportStatic;
