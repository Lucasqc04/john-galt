import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './domain/locales/Language';
import { ThemeProvider } from './view/context/ThemeContext';
import App from './view/screens/App';
import './view/styles/index.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
