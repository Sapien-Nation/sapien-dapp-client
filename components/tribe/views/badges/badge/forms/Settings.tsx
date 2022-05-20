import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { HexColorPicker } from 'react-colorful';

// components
import { TextInput, TextInputLabel } from 'components/common';
import { useFormContext } from 'react-hook-form';

const SettingsForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popover = useRef();

  const { setValue, watch } = useFormContext();

  useClickAway(popover, () => {
    setIsOpen(!isOpen);
  });

  const [badgeColor] = watch(['color']);

  return (
    <div className="flex flex-col p-3">
      <TextInputLabel label="Badge Icon" name="icon" error="" />
      <div className="relative">
        <img
          src={'https://ui-avatars.com/api/?name=tribe'}
          alt="tribe-avatar"
          className={`border-2 border-[${badgeColor}] w-8 h-8 object-cover rounded-full`}
          onClick={() => setIsOpen(!isOpen)}
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
