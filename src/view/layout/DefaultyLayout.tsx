import { Outlet } from 'react-router-dom';
import Header from './Header';

export function DefaultLayout() {
  return (
    <div className="text-black dark:text-white w-full max-w-[100vw]">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
