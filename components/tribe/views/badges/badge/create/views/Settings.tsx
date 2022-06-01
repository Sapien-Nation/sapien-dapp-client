import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { HexColorPicker } from 'react-colorful';

// components
import { TextareaInput, TextInput, TextInputLabel } from 'components/common';
import { useFormContext } from 'react-hook-form';

// hooks
import { useTribe } from 'hooks/tribe';

// types
import type { DraftBadge } from '../../../types';

interface Props {
  badge: DraftBadge;
}

const SettingsForm = ({ badge }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const popover = useRef();
  const { query } = useRouter();
  const { setValue, watch } = useFormContext();
  useClickAway(popover, () => setIsOpen(!isOpen));

  const [badgeColor] = watch(['color']);

  return (
    <div className="flex flex-col p-3">
      <TextInputLabel label="Badge Icon" name="icon" error="" />
      <div className="relative">
        {badge.avatar ? (
          <img
            src={badge.avatar}
            alt=""
            className={`border-2 w-8 h-8 object-cover rounded-full cursor-pointer`}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            style={{ borderColor: badgeColor }}
          />
        ) : (
          <div
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="w-8 h-8 rounded-full bg-gray-700 border-2 font-bold text-black group-hover:text-gray-500 flex items-center justify-center"
            style={{ borderColor: badgeColor }}
          >
            D
          </div>
        )}
        {isOpen && (
          <div className="absolute left-0" ref={popover}>
            <HexColorPicker
              className="absolute top-5"
              color={badgeColor}
              onChange={(color) => {
                setValue('color', color);
              }}
            />
          </div>
        )}
      </div>
      <TextInputLabel label="Badge Name" name="name" error="" />
      <TextInput name="name" aria-label="name" />
      <TextInputLabel label="Badge Description" name="description" error="" />
      <TextareaInput
        name="description"
        aria-label="description"
        maxLength={4000}
      />
    </div>
  );
};

export default SettingsForm;
