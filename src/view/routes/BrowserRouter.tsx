import { Suspense } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { AcceptedLanguages, useLanguage } from '../../domain/locales/Language';
import { Checkout } from '../components/Checkout/Checkout';
import { Loader } from '../components/Loader';
import { DefaultLayout } from '../layout/DefaultyLayout';
import { About } from '../screens/About';
import { BlogPost } from '../screens/BlogPost';
import { NotFound } from '../screens/NotFound';
import { Page } from '../screens/Page';
import { Products } from '../screens/partials/Products';
import { ProductPage } from '../screens/ProductPage/ProductPage';
import { ROUTES } from './Routes';

export function BrowserRouter() {
  const { currentLang } = useLanguage();

  return (
    <Router>
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
            <Route path={ROUTES.products.path} element={<Products />} />
            <Route path={ROUTES.blog.path} element={<BlogPost />} />
            <Route path={ROUTES.product.path} element={<ProductPage />} />
            <Route path={ROUTES.about.path} element={<About />} />
            <Route path={ROUTES.checkout.path} element={<Checkout />}></Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
