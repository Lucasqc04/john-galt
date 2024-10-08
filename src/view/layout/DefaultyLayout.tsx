import { Outlet } from 'react-router-dom';
import { useLanguage } from '../../domain/locales/Language';
import { Newsletter } from '../screens/partials/Newsletter/Newsletter';
import { Footer } from './Footer/Footer';
import Header from './Header/Header';
export function DefaultLayout() {
  useLanguage();

  return (
    <div className="text-black dark:text-white w-full max-w-[100vw] m-0">
      <Header />
      <main>
        <Outlet />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}
