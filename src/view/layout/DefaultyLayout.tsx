import { Outlet } from 'react-router-dom';
import { useLanguage } from '../../domain/locales/Language';
import { Background } from '../components/BackgroundAnimatedProduct';
import InstagramButton from '../components/buttonInstagram';
import WhatsAppButton from '../components/buttonWhatsApp';
import Header from '../screens/Header/HeaderAlfred';

export function DefaultLayout() {
  useLanguage();

  return (
    <>
      <Background />
      <Header />
      <Outlet />
      <InstagramButton />
      <WhatsAppButton />
    </>
  );
}
