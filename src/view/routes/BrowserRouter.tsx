import { Suspense, lazy } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { AcceptedLanguages, useLanguage } from '../../domain/locales/Language';
import { Loader } from '../components/Loader';
import ScrollToTop from '../components/ScrollToTop';
import { AboutBuyBitcoin } from '../screens/BuyBitcoin/AboutBuyBitcoin';
import BuyBitcoin from '../screens/BuyBitcoin/BuyBitcoin';
import BuyCheckout from '../screens/BuyBitcoin/BuyCheckout';
import { PaymentAlfredFailure } from '../screens/BuyBitcoin/pageFailure';
import { PaymentAlfredSuccess } from '../screens/BuyBitcoin/pageSucces';
import { Fees } from '../screens/BuyBitcoin/RateBitcoin';
import { TermsOfUse } from '../screens/BuyBitcoin/TermsUse';
import { ROUTES } from './Routes';

const NotFound = lazy(() =>
  import('../screens/NotFound').then((module) => ({
    default: module.NotFound,
  })),
);

const SupportPage = lazy(() =>
  import('../screens/support').then((module) => ({
    default: module.Support,
  })),
);

export function BrowserRouter() {
  const { currentLang } = useLanguage();

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path={ROUTES.home.call()}
            element={
              <Navigate to={`/${currentLang || AcceptedLanguages.pt}`} />
            }
          />
          <Route path={ROUTES.lang.call()} element={<BuyBitcoin />}></Route>
          <Route path={ROUTES.lang.call()}>
            <Route path={ROUTES.buyBitcoin.path} element={<BuyBitcoin />} />
            <Route path={ROUTES.fee.path} element={<Fees />} />
            <Route path={ROUTES.buyCheckout.path} element={<BuyCheckout />} />
            <Route path={ROUTES.Support.path} element={<SupportPage />} />
            <Route
              path={ROUTES.paymentAlfredStatus.success.path}
              element={<PaymentAlfredSuccess />}
            />
            <Route
              path={ROUTES.paymentAlfredStatus.failure.path}
              element={<PaymentAlfredFailure />}
            />
            <Route
              path={ROUTES.aboutBitcoin.path}
              element={<AboutBuyBitcoin />}
            />
            <Route path={ROUTES.term.path} element={<TermsOfUse />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
