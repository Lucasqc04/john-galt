import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import * as TagManager from 'react-gtm-module';
import { ToastContainer } from 'react-toastify';
import './domain/locales/Language';
import { ThemeProvider } from './view/context/ThemeContext';
import { App } from './view/screens/App';
import './view/styles/index.css';

// const tagManagerArgs = {
//   gtmId: import.meta.env.VITE_GTM_ID,
// };

// TagManager.initialize(tagManagerArgs);

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <ToastContainer />
    </ThemeProvider>
  </StrictMode>,
);
