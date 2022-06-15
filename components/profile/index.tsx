// components
import PassportForm from './PassportForm';

enum View {
  Passport,
}

interface Props {
  setShowProfileOverlay?: (showProfileOverlay: boolean) => void;
}

const ProfileOverlay = ({ setShowProfileOverlay }: Props) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex items-center justify-center">
        <img
          alt="Passport"
          className="absolute w-[690px] cover -z-10"
          src="/images/passport_background_transparent.png"
        />
        <PassportForm />
      </div>
    </div>
  );
};

export default ProfileOverlay;
