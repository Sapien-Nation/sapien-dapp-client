import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { XIcon } from '@heroicons/react/outline';
import Lottie from 'react-lottie-player';

// components
import { Overlay } from 'components/common';
import Sidebar from './navigation';
import SearchView from './search';
import { CreateBadgeView, ManageBadgeView, OwnerBadgeView } from './badge';

// assets
import daoJSONData from './lottie/dao.json';

// context
import { useAuth } from 'context/user';

// hooks
import { useTribe } from 'hooks/tribe';

// types
import type { DraftBadge } from './types';
import type { TribeBadge } from 'tools/types/tribe';

enum View {
  Home,
  Search,
  Dummy,
}

const BadgesView = () => {
  const [view, setView] = useState(View.Home);
  const [isOpen, setIsOpen] = useState(true);
  const [draftBadges, setDraftBadges] = useState<Array<DraftBadge>>([]);
  const [selectedBadge, setSelectedBadge] = useState<
    DraftBadge | TribeBadge | null
  >(null);

  const { me } = useAuth();
  const { back, query } = useRouter();

  const tribeID = query.tribeID as string;
  const { avatar } = useTribe(tribeID);

  const isCurrentBadgeADraft = () =>
    Boolean(
      draftBadges.find((draftBadge) => draftBadge.id === selectedBadge.id)
    );

  const handleAddDraftBadge = () => {
    const badge = {
      id: nanoid(),
      avatar,
      description: '',
      name: '',
      color: '#6200ea',
      members: [],
      permissions: [],
    };

    const prevSelectedBadge = { ...selectedBadge };
    setView(View.Dummy);
    setSelectedBadge(null);
    if (
      Boolean(
        draftBadges.find((draftBadge) => draftBadge.id === prevSelectedBadge.id)
      )
    ) {
      setDraftBadges((currentDraftBadges) =>
        currentDraftBadges.filter((badge) => badge.id !== prevSelectedBadge.id)
      );
    }

    setDraftBadges((currentDraftBadges) => [...currentDraftBadges, badge]);

    queueMicrotask(() => {
      setSelectedBadge(badge);
    });
  };

  const renderView = () => {
    if (selectedBadge) {
      if (selectedBadge.name === 'Owner') {
        return <OwnerBadgeView />;
      }

      if (isCurrentBadgeADraft()) {
        return (
          <CreateBadgeView
            badge={selectedBadge as DraftBadge}
            onCancel={() => {
              setDraftBadges((currentDraftBadges) =>
                currentDraftBadges.filter(
                  (badge) => badge.id !== selectedBadge.id
                )
              );
              setSelectedBadge(null);
              setView(View.Home);
            }}
          />
        );
      }

      return <ManageBadgeView badge={selectedBadge as DraftBadge} />;
    }

    switch (view) {
      case View.Home: {
        return (
          <div>
            <div className="bg-gradient-to-r to-[#6200ea] from-black px-4 py-8 font-semibold text-lg lg:text-2xl rounded-md">
              <h1>Decentralize, automate, and grow your tribe</h1>
            </div>
            <div>
              <Lottie
                animationData={daoJSONData}
                play
                loop
                className="max-w-1100px m-auto pt-6 h-[15rem]"
              />
            </div>
            <div className="whitespace-pre-line text-gray-300 space-y-2 pt-3 text-justify">
              <h2 className="text-2xl text-white"> Overview </h2>
              <p>
                Badges are tokens that build a shared social ledger on Sapien.
              </p>
              <p>
                Badges may grant special privileges within communities on the
                platform. For example, your tribe can use a badge to represent
                membership, a credential, or a flag. You may also choose to use
                another tribe’s badges in your community.
              </p>

              <h2 className="text-lg text-white pt-3"> Owner Badge </h2>
              <p>
                Tribe members with the owner badge are able to access the vault
                and issue new badges.
              </p>

              <h2 className="text-lg text-white pt-3"> Moderator Badge </h2>
              <p>
                Tribe members with the moderator badge are able to manage rooms
                and channels.
              </p>

              <h2 className="text-lg text-white pt-3"> Custom Badges </h2>
              <p>
                As an issuing authority, feel free to create your own badges -
                the possibilities are limitless!
              </p>
            </div>
          </div>
        );
      }
      case View.Dummy:
        return <div></div>;
      case View.Search:
        return (
          <SearchView
            onSelect={(badge) => {
              setDraftBadges((currentDraftBadges) => [
                ...currentDraftBadges,
                badge,
              ]);
              setSelectedBadge(badge);
            }}
          />
        );
    }
  };

  return (
    <Overlay onClose={back} isOpen={isOpen}>
      <div className="flex h-full">
        <div className="hidden md:flex md:w-64 md:flex-col md:inset-y-0">
          <Sidebar
            handleAddDraftBadge={handleAddDraftBadge}
            draftBadges={draftBadges}
            setSelectedBadge={setSelectedBadge}
            selectedBadge={selectedBadge}
            showSearch={() => {
              setView(View.Search);
              if (isCurrentBadgeADraft()) {
                setDraftBadges((currentDraftBadges) =>
                  currentDraftBadges.filter(
                    (badge) => badge.id !== selectedBadge.id
                  )
                );
              }

              setSelectedBadge(null);
            }}
            handleClickHome={() => {
              setView(View.Home);
              if (isCurrentBadgeADraft()) {
                setDraftBadges((currentDraftBadges) =>
                  currentDraftBadges.filter(
                    (badge) => badge.id !== selectedBadge.id
                  )
                );
              }

              setSelectedBadge(null);
            }}
          />
        </div>
        <div className="flex-1 overflow-auto">
          <button
            type="button"
            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none absolute right-8 top-5 z-10"
            onClick={() => setIsOpen(false)}
          >
            <span className="sr-only">Close Badges Managment</span>
            <XIcon className="h-8 w-8" aria-hidden="true" />
          </button>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 relative">
            <div className="py-8">{renderView()}</div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

const BadgesViewProxy = () => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;
  const { isUpgraded } = useTribe(tribeID);

  if (isUpgraded === false) {
    return (
      <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-full w-full">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
            alt="People working on laptops"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
        </div>
        <div className="px-4 py-4 flex flex-col gap-4 absolute justify-center items-center w-full text-center h-full">
          <p>You need to Upgrade this tribe in order to Manage Badges</p>
          <div className="flex justify-between gap-4">
            <Link passHref href={`/tribes/${tribeID}/upgrade`}>
              <a className="flex justify-center h-12 items-center py-2 px-4 border-2 rounded-md shadow-sm text-md font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
                Upgrade Tribe
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <BadgesView />;
};

export default BadgesViewProxy;
