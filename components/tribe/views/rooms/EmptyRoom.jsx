import { ChatIcon } from '@heroicons/react/outline';

const EmptyRoom = () => (
  <div className='flex justify-center items-center h-full text-center'>
    <div className='text-sapien-neutral-200'>
      <ChatIcon className='w-40' />
      <h2 className='text-xl'>{`Let's start!`}</h2>
      <h3 className='text-base'>{`Share your thoughts`}</h3>
    </div>
  </div>
);

export default EmptyRoom;
