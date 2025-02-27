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
import { DefaultLayout } from '../layout/DefaultyLayout';
import { AboutBuyBitcoin } from '../screens/About/AboutBuyBitcoin';
import BuyBitcoin from '../screens/Checkout/Checkout';
import { CheckoutPix } from '../screens/Checkout/CheckoutPix';
import DataForm from '../screens/Checkout/DataForm/DataForm';
import { PaymentAlfredFailure } from '../screens/paymentStatus/pageFailure';
import { PaymentAlfredReview } from '../screens/paymentStatus/pageReview';
import { PaymentAlfredSuccess } from '../screens/paymentStatus/pageSucces';
import { Fees } from '../screens/Rate/RateBitcoin';
import { TermsOfUse } from '../screens/Terms/TermsUse';
import { ROUTES } from './Routes';

const NotFound = lazy(() =>
  import('../screens/NotFound').then((module) => ({
    default: module.NotFound,
  })),
);

const SupportPage = lazy(() =>
  import('../screens/Support/support').then((module) => ({
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
          <Route path={ROUTES.lang.call()} element={<DefaultLayout />}>
            <Route path={ROUTES.buyBitcoin.path} element={<BuyBitcoin />} />
            <Route path={ROUTES.fee.path} element={<Fees />} />
            <Route path={ROUTES.buyCheckout.path} element={<DataForm />} />
            <Route path={ROUTES.checkoutPix.path} element={<CheckoutPix />} />
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
              path={ROUTES.paymentAlfredStatus.review.path}
              element={<PaymentAlfredReview />}
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
