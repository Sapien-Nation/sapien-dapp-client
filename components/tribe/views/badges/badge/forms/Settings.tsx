import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { HexColorPicker } from 'react-colorful';

// components
import { TextInput, TextInputLabel } from 'components/common';
import { useFormContext } from 'react-hook-form';

// hooks
import { useTribe } from 'hooks/tribe';

const SettingsForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const popover = useRef();
  const { query } = useRouter();
  const { setValue, watch } = useFormContext();

  const tribeID = query.tribeID as string;
  const { avatar } = useTribe(tribeID);

  useClickAway(popover, () => {
    setIsOpen(!isOpen);
  });

  const [badgeColor] = watch(['color']);

  return (
    <div className="flex flex-col p-3">
      <TextInputLabel label="Badge Icon" name="icon" error="" />
      <div className="relative">
        <img
          src={avatar}
          alt="Tribe Avatar"
          className={`border-2 w-8 h-8 object-cover rounded-full`}
          onClick={() => setIsOpen(!isOpen)}
          style={{ borderColor: badgeColor }}
        />
        {isOpen && (
          <div className="absolute left-0" ref={popover}>
            <HexColorPicker
              className="absolute top-5"
              color={badgeColor}
              onChange={(color) => setValue('color', color)}
            />
          </div>
        )}
      </div>
      <TextInputLabel label="Badge Name" name="name" error="" />
      <TextInput name="name" aria-label="name" />
      <TextInputLabel label="Badge Description" name="description" error="" />
      <TextInput name="description" aria-label="description" />
    </div>
  );
};

export default SettingsForm;
