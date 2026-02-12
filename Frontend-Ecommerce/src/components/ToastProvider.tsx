// src/components/ToastProvider.tsx
import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider: React.FC = () => {
  return (
    <>
      <Toaster 
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          // Default options for all toasts
          className: '',
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      {/* Global styles for toast progress bar */}
      <style>{`
        /* Toast progress bar animation */
        @keyframes toast-progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        /* Add progress bar to all toasts */
        .react-hot-toast > div {
          position: relative;
          overflow: hidden;
        }

        .react-hot-toast > div::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          width: 100%;
          background: rgba(255, 255, 255, 0.3);
          animation: toast-progress 4s linear forwards;
          border-radius: 0 0 8px 8px;
        }

        /* Success toast progress bar - white with opacity */
        .react-hot-toast[data-type="success"] > div::after {
          background: rgba(255, 255, 255, 0.5);
        }

        /* Error toast progress bar - white with opacity */
        .react-hot-toast[data-type="error"] > div::after {
          background: rgba(255, 255, 255, 0.5);
        }

        /* Info toast progress bar - white with opacity */
        .react-hot-toast[data-type="custom"] > div::after {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </>
  );
};

export default ToastProvider;