import { Outlet } from 'react-router-dom';
import { Newsletter } from '../components/Newsletter';
import { Footer } from './Footer';
import Header from './Header';

export function DefaultLayout() {
  return (
    <div className="text-black dark:text-white w-full max-w-[100vw] m-0  dark:bg-gray-800">
      <Header />
      <main>
        <Outlet />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}
