import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'flowbite';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { UserProvider } from './dash/createContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google'; // ✅ Import this

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        {/* ✅ Wrap your app with GoogleOAuthProvider */}
        <GoogleOAuthProvider clientId="76013217179-n4q6qvl419g0ihcg1nlvmc5p1fll7ekv.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
