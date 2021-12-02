import { createContext, useReducer, useContext } from 'react';

// constants
import { ToastType } from 'constants/toast';

const ToastStateContext = createContext({ toasts: [] });
const ToastDispatchContext = createContext(null);

function ToastReducer(state, action) {
  switch (action.type) {
    case 'ADD_TOAST': {
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };
    }
    case 'DELETE_TOAST': {
      const updatedToasts = state.toasts.filter((e) => e.id != action.id);
      return {
        ...state,
        toasts: updatedToasts,
      };
    }
    default:
      return state;
  }
}

export function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(ToastReducer, {
    toasts: [],
  });

  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
}

export const useToast = (delay = 4000) => {
  const dispatch = useToastDispatchContext();

  return ({
    type = ToastType.Error,
    message,
  }: {
    type?: ToastType;
    message: string;
  }) => {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({
      type: 'ADD_TOAST',
      toast: {
        type,
        message,
        id,
      },
    });

    setTimeout(() => {
      dispatch({ type: 'DELETE_TOAST', id });
    }, delay);
  };
};

export const useToastStateContext = () => useContext(ToastStateContext);
export const useToastDispatchContext = () => useContext(ToastDispatchContext);
