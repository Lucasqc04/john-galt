import { Suspense } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { AcceptedLanguages, useLanguage } from '../../domain/locales/Language';
import WhatsAppButton from '../components/ButtonWhatsApp/buttonWhatsApp';
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
import { TutorialsPage } from '../screens/TutorialsPage'; // Importando a página de tutoriais
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
            <Route
              path={ROUTES.tutorials.path}
              element={<TutorialsPage />}
            />{' '}
            {/* Nova rota para tutoriais */}
          </Route>
          <Route path={ROUTES.lang.call()}>
            <Route path={ROUTES.cart.checkout.path} element={<Checkout />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppButton />
      </Suspense>
    </Router>
  );
}
