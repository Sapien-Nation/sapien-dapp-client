import { useState } from 'react';

// components
import Queue from './Queue';
import History from './History';

interface Props {
  badgeID: string;
  closeOverlay: () => void;
  onBack: () => void;
}

enum View {
  Queue,
  History
}

const Transaction = () => {
  const [view, setView] = useState<View>(View.Queue);

  const renderView = () => {
    switch (view) {
      case View.Queue:
        return <Queue />;
      case View.History:
        return <History />;
    }
  };

  return (
    <>
      <div>
        <button
          className={`border-b-2 ${view === View.Queue ? 'border-white-600' : 'border-transparent'
            } px-7 py-2`}
          onClick={() => setView(View.Queue)}
        >
          Queue
        </button>
        <button
          className={`border-b-2 ${view === View.History ? 'border-white-600' : 'border-transparent'
            } px-7 py-2`}
          onClick={() => setView(View.History)}
        >
          History
        </button>
      </div>
      <div className="flex flex-col rounded-xl bg-sapien-neutral-600 py-7">
        <div>{renderView()}</div>
      </div>
    </>
  );
};

export default Transaction;
