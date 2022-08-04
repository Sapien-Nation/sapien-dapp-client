import { useRef } from 'react';
import { useClickAway } from 'react-use';

// components
import PassportForm from './PassportForm';

interface Props {
  setShowProfileOverlay?: (showProfileOverlay: boolean) => void;
}

const ProfileOverlay = ({ setShowProfileOverlay }: Props) => {
  const passportRef = useRef();

  useClickAway(passportRef, () => setShowProfileOverlay(false));

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div
        className="flex items-center justify-center bg-sapien-dark-purple/70 sm:bg-transparent border-2 sm:border-0 border-purple-900 rounded-xl p-12"
        ref={passportRef}
      >
        <img
          alt="Passport"
          className="invisible sm:visible absolute w-[690px] cover -z-10"
          src="/images/passport_background_transparent.png"
        />
        <PassportForm closeOverlay={() => setShowProfileOverlay(false)} />
      </div>
    </div>
  );
};

export default ProfileOverlay;
