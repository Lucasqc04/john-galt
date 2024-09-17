import { Suspense } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { Loader } from '../components/Loader';
import { DefaultLayout } from '../layout/DefaultyLayout';
import { NotFound } from '../screens/NotFound';
import { Page } from '../screens/Page';

export function BrowserRouter() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/pt" />} />
          <Route path="/:lang" element={<DefaultLayout />}>
            <Route index element={<Page />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
