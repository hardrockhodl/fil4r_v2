import React from 'react';
import { FileUpload } from './components/FileUpload';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="container">
      <FileUpload />
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#242424',
            color: '#e1e1e1',
            borderRadius: '12px',
            border: '1px solid #333',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          },
          success: {
            iconTheme: {
              primary: '#3b82f6',
              secondary: '#242424'
            }
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#242424'
            }
          }
        }}
      />
    </div>
  );
}

export default App;