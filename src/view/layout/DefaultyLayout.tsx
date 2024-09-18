import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function DefaultLayout() {
  return (
    <div className="text-black dark:text-white w-screen">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
