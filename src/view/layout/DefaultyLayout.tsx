import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import Header from './Header';

export function DefaultLayout() {
  return (
    <div className="text-black dark:text-white w-full max-w-[100vw] m-0">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
