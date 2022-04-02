import { ChatIcon } from '@heroicons/react/outline';

const EmptyRoom = () => (
  <div className="flex flex-col justify-center items-center h-full text-center text-sapien-neutral-200">
    <ChatIcon className="w-12" />
    <h2 className="text-sm">Awaiting for that first awesome message</h2>
  </div>
);

export default EmptyRoom;
