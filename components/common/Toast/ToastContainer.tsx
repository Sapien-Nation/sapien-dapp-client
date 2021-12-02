// components
import Toast from './Toast';

// context
import { useToastStateContext } from 'context/toast';

export default function ToastContainer() {
  const { toasts } = useToastStateContext();

  return (
    <div className="fixed bottom-5 right-5 ">
      <div className="max-w-xl mx-auto">
        {toasts.map((toast) => (
          <Toast
            id={toast.id}
            key={toast.id}
            type={toast.type}
            message={toast.message}
          />
        ))}
      </div>
    </div>
  );
}
