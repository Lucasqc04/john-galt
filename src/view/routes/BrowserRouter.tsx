import { Suspense } from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
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
import { About } from '../screens/About';
import { BlogPost } from '../screens/BlogPost/BlogPost';
import { Cart } from '../screens/Cart/Cart';
import { Checkout } from '../screens/Checkout/Checkout';
import { NotFound } from '../screens/NotFound';
import { Page } from '../screens/Page';
import { Products } from '../screens/partials/Products';
import { ProductPage } from '../screens/ProductPage/ProductPage';
import { ROUTES } from './Routes';

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
            <Route path={ROUTES.cart.path} element={<Cart />} />
          </Route>
          <Route path={ROUTES.lang.call()}>
            <Route path={ROUTES.cart.checkout.path} element={<Checkout />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingWhatsApp
          phoneNumber="+5511994458337"
          accountName="DIY LAB"
          onClick={() =>
            window.open(
              'https://api.whatsapp.com/send?phone=+5511994458337&text=Ol%C3%A1,%20Tudo%20bem?%0A%0AEu%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20DIY%20LAB...',
              '_blank',
            )
          }
        />
      </Suspense>
    </Router>
  );
}
