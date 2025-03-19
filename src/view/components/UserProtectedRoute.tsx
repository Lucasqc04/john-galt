import { Navigate, Outlet } from 'react-router-dom';
import { useLanguage } from '../../domain/locales/Language';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../routes/Routes';

export const UserProtectedRoute = () => {
  const { user } = useAuth();
  const { currentLang } = useLanguage();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.auth.login.call(currentLang)} />
  );
};
