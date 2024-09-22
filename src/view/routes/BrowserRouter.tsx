import i18n from 'i18next';
import { Suspense, useEffect } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
} from 'react-router-dom';
import { Loader } from '../components/Loader';
import { DefaultLayout } from '../layout/DefaultyLayout';
import { NotFound } from '../screens/NotFound';
import { Page } from '../screens/Page';

function LanguageLoader() {
  const { lang } = useParams();

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem('language', lang);
    }
  }, [lang]);

  return null;
}

export function BrowserRouter() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to={`/${localStorage.getItem('language') || 'pt'}`} />
            }
          />
          <Route path="/:lang" element={<DefaultLayout />}>
            <Route index element={<Page />} />
            <Route path="" element={<LanguageLoader />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
