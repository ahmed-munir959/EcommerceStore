// src/utils/toast.config.ts
import toast from 'react-hot-toast';

// Custom toast configurations
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#10B981',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      minWidth: '250px',
    },
    icon: '✓',
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#EF4444',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      minWidth: '250px',
    },
    icon: '✕',
  });
};

export const showInfoToast = (message: string) => {
  toast(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#3B82F6',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      minWidth: '250px',
    },
    icon: 'ℹ',
  });
};