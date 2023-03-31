import { toast } from 'react-toastify';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

export const displayNotification = (
  type: NotificationType,
  message: string
): any => {
  toast[type](message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    pauseOnFocusLoss: true,
  });
};
