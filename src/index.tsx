import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Ensure the correct path to the App component

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Environment variables
// These should be set in your .env file, not in your source code
// VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
// VITE_SUPABASE_ANON_KEY=your-anon-key