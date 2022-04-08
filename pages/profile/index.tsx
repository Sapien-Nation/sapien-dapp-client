// components
import { SEO } from 'components/common';

// context
import { useAuth } from 'context/user';

// types
import type { NextPage } from 'next';

const ProfilePage: NextPage = () => {
  const { me } = useAuth();

  return (
    <>
      <SEO title="Sapien" />
      <div className="max-w-2xl mx-auto border-b border-gray-800 pb-4">
        <div className="flex items-start gap-4">
          <div className="w-32 object-cover">
            <img
              className="object-cover shadow-lg rounded-xl"
              src={
                me.avatar ||
                'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240'
              }
              alt={me.displayName}
            />
          </div>
          <div className="leading-6 font-medium space-y-1">
            <h3 className="text-xl text-gray-400 mt-2">{me.displayName}</h3>
            <p className="text-lg text-gray-500">{me.username}</p>
          </div>
        </div>
        <div className="text-lg mt-2">
          <p className="text-gray-500">
            Ultricies massa malesuada viverra cras lobortis. Tempor orci hac
            ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras.
            Nisl dictum.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
