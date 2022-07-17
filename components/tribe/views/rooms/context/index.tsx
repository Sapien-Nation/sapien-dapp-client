import { createContext, useContext, useState } from 'react';

interface Room {
  selectedMessage: string | null;
  setSelectedMessage: (message: string | null) => void;
  selectedMessageToEdit: string | null;
  setSelectedMessageToEdit: (message: string | null) => void;
}

export const MessageContext = createContext<Room>({
  selectedMessage: null,
  setSelectedMessage: () => {},
  selectedMessageToEdit: null,
  setSelectedMessageToEdit: () => {},
});

interface Props {
  children: React.ReactNode;
}

const RoomProvider = ({ children }: Props) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessageToEdit, setSelectedMessageToEdit] = useState(null);

  return (
    <MessageContext.Provider
      value={{
        selectedMessage,
        setSelectedMessage,
        selectedMessageToEdit,
        setSelectedMessageToEdit,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

function useRoomCtx() {
  const context = useContext(MessageContext);

  if (context === undefined) {
    throw new Error('useRoomCtx must be used within a RoomProvider');
  }
  return context;
}

export { RoomProvider, useRoomCtx };
