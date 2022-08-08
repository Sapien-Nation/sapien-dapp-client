import { useEffect, useRef } from 'react';
import { useClickAway } from 'react-use';

// components
import PassportForm from './PassportForm';

interface Props {
  setShowProfileOverlay?: (showProfileOverlay: boolean) => void;
}

const ProfileOverlay = ({ setShowProfileOverlay }: Props) => {
  const containerRef = useRef(null);
  const passportRef = useRef();

  useClickAway(passportRef, () => setShowProfileOverlay(false));

  useEffect(() => {
    containerRef.current.focus();
  }, []);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setShowProfileOverlay(false);
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [setShowProfileOverlay]);

  return (
    <div
      className="h-full w-full flex items-center justify-center focus:outline-none"
      tabIndex={-1}
      ref={containerRef}
    >
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
