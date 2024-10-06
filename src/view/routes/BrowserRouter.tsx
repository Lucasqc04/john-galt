import { Suspense } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { useLanguage } from '../../domain/locales/Language';
import { Loader } from '../components/Loader';
import { Products } from '../components/Products/Products';
import { DefaultLayout } from '../layout/DefaultyLayout';
import { NotFound } from '../screens/NotFound';
import { Page } from '../screens/Page';

export function BrowserRouter() {
  const { currentLang } = useLanguage();

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/${currentLang || 'pt'}`} />}
          />
          <Route path="/:lang" element={<DefaultLayout />}>
            <Route index element={<Page />} />
            <Route path="produtos" element={<Products />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
