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
import { AboutBuyBitcoin } from '../screens/BuyBitcoin/AboutBuyBitcoin';
// import BuyBitcoin from '../screens/BuyBitcoin/BuyBitcoin';
// import BuyCheckout from '../screens/BuyBitcoin/BuyCheckout';
import { Fees } from '../screens/BuyBitcoin/RateBitcoin';
import { TermsOfUse } from '../screens/BuyBitcoin/TermsUse';
import { BitcoinPayment } from '../screens/Checkout/BitcoinPayment';
import { PixPayment } from '../screens/Checkout/PixPayment';
import { ROUTES } from './Routes';

const About = lazy(() =>
  import('../screens/About').then((module) => ({
    default: module.About,
  })),
);
const BlogPost = lazy(() =>
  import('../screens/BlogPost/BlogPost').then((module) => ({
    default: module.BlogPost,
  })),
);
const Cart = lazy(() =>
  import('../screens/Cart/Cart').then((module) => ({
    default: module.Cart,
  })),
);
const Checkout = lazy(() =>
  import('../screens/Checkout/Checkout').then((module) => ({
    default: module.Checkout,
  })),
);
const NotFound = lazy(() =>
  import('../screens/NotFound').then((module) => ({
    default: module.NotFound,
  })),
);
const Page = lazy(() =>
  import('../screens/Page').then((module) => ({
    default: module.Page,
  })),
);
const Products = lazy(() =>
  import('../screens/partials/Products').then((module) => ({
    default: module.Products,
  })),
);
const PaymentFailure = lazy(() =>
  import('../screens/paymentStatus/PaymentFailure').then((module) => ({
    default: module.PaymentFailure,
  })),
);
const PaymentSuccess = lazy(() =>
  import('../screens/paymentStatus/PaymentSucess').then((module) => ({
    default: module.PaymentSuccess,
  })),
);
const PrivacyPolicy = lazy(() =>
  import('../screens/PrivacyPolicy').then((module) => ({
    default: module.PrivacyPolicy,
  })),
);
const ProductPage = lazy(() =>
  import('../screens/ProductPage/ProductPage').then((module) => ({
    default: module.ProductPage,
  })),
);
const SupportPage = lazy(() =>
  import('../screens/support').then((module) => ({
    default: module.Support,
  })),
);
const TutorialsPage = lazy(() =>
  import('../screens/TutorialsPage').then((module) => ({
    default: module.TutorialsPage,
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
            <Route index element={<Page />} />
            <Route path={ROUTES.cart.products.path} element={<Products />} />
            <Route path={ROUTES.blog.path} element={<BlogPost />} />
            <Route path={ROUTES.cart.product.path} element={<ProductPage />} />
            <Route path={ROUTES.about.path} element={<About />} />
            <Route path={ROUTES.Support.path} element={<SupportPage />} />
            <Route path={ROUTES.cart.path} element={<Cart />} />
            <Route path={ROUTES.tutorials.path} element={<TutorialsPage />} />
            <Route
              path={ROUTES.paymentStatus.success.path}
              element={<PaymentSuccess />}
            />
            <Route
              path={ROUTES.policyPrivacy.path}
              element={<PrivacyPolicy />}
            />
          </Route>
          <Route path={ROUTES.lang.call()}>
            <Route
              path={ROUTES.paymentStatus.failure.path}
              element={<PaymentFailure />}
            />
            <Route path={ROUTES.cart.checkout.path} element={<Checkout />} />
            {/* <Route path={ROUTES.buyBitcoin.path} element={<BuyBitcoin />} /> */}
            <Route path={ROUTES.fee.path} element={<Fees />} />
            {/* <Route path={ROUTES.buyCheckout.path} element={<BuyCheckout />} /> */}
            <Route
              path={ROUTES.aboutBitcoin.path}
              element={<AboutBuyBitcoin />}
            />
            <Route path={ROUTES.term.path} element={<TermsOfUse />} />
            <Route
              path={ROUTES.cart.pixPayment.path}
              element={<PixPayment />}
            />
            <Route
              path={ROUTES.cart.pixPayment.path}
              element={<BitcoinPayment />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
