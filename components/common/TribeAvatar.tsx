import Link from 'next/link';

// types
import type { ProfileTribe } from 'tools/types/tribe';

interface ContextMenuPosition {
  left: number;
  top: number;
}

interface Props {
  tribe: ProfileTribe;
  onRightClick?: (tribe: ProfileTribe) => void;
  routerTribeID?: string[] | string;
  tooltipRef?: any;
  useBorder?: boolean;
  handleMobileMenu?: () => void;
  setContextMenuPosition?: (ContextMenuPosition) => void;
}

function TribeAvatar({
  tribe,
  onRightClick,
  routerTribeID,
  tooltipRef,
  useBorder,
  handleMobileMenu,
  setContextMenuPosition,
}: Props) {
  return (
    <Link href={`/tribes/${tribe.id}/home`} key={tribe.id}>
      <a
        className={`h-12 w-12 group p-1 cursor-pointer rounded-xl flex items-center text-base font-medium text-gray-600 hover:text-gray-900 ${
          routerTribeID === tribe.id && 'border-white hover:border-white'
        } ${useBorder && 'border-2 border-white/10 hover:border-gray-400'}`}
        onClick={(event) => {
          if (event.type === 'contextmenu') {
            event.preventDefault();
            if (tribe.isMain === false) {
              setContextMenuPosition({
                left: event.clientX,
                top: event.clientY,
              });
              onRightClick(tribe);
            }
          }
          if (handleMobileMenu) {
            handleMobileMenu();
          }
        }}
        onContextMenu={(event) => {
          if (event.type === 'contextmenu') {
            event.preventDefault();
            if (tribe.isMain === false) {
              setContextMenuPosition({
                left: event.clientX,
                top: event.clientY,
              });
              onRightClick(tribe);
            }
          }
        }}
        ref={tooltipRef ? tooltipRef.current?.setTriggerRef : null}
      >
        {tribe.avatar ? (
          <img
            className="w-full h-full rounded-lg text-gray-400 bg-gray-900 group-hover:text-gray-500"
            alt={''}
            src={tribe.avatar}
          />
        ) : (
          <div className="w-full h-full rounded-lg bg-gray-700 font-bold text-black group-hover:text-gray-500 flex items-center justify-center">
            {tribe.name[0].toUpperCase()}
          </div>
        )}
        <span className="sr-only">Go to {tribe.name}</span>
      </a>
    </Link>
  );
}

export default TribeAvatar;
