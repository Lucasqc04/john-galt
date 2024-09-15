import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './config/i18n';
import { ThemeProvider } from './context/ThemeContext';
import './styles/index.css';
import App from './views/App';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
