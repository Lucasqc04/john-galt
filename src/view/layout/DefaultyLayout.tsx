import { Outlet } from 'react-router-dom';
import { useLanguage } from '../../domain/locales/Language';
import { BackgroundAnimatedProduct } from '../components/BackgroundAnimatedProduct';
import WhatsAppButton from '../components/buttonWhatsApp';
import Header from '../screens/Header/HeaderAlfred';

export function DefaultLayout() {
  useLanguage();

  return (
    <>
      <BackgroundAnimatedProduct />
      <Header />
      <Outlet />
      <WhatsAppButton />
    </>
  );
}
