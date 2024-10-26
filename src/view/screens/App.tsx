import { initMercadoPago } from '@mercadopago/sdk-react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { BrowserRouter } from '../routes/BrowserRouter';

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY);

export function App() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <BrowserRouter />
    </>
  );
}
