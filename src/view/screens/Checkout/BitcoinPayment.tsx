import { t } from 'i18next';
import { FaBitcoin } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import { LanguageSwitcher } from '../../components/LanguageSwitcher/LanguageSwitcher';

export function BitcoinPayment() {
  const location = useLocation();
  const { qrCodeUrl } = location.state || {};
  const navigate = useNavigate();

  return (
    <>
      <BackgroundAnimatedProduct />
      <header className="px-4 pt-10 flex items-start justify-between dark:text-white">
        <div className="flex items-center gap-x-4">
          <button onClick={() => navigate(-1)}>
            <FaBitcoin size={28} className="text-gray-900 dark:text-white" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t('checkout.bitcoinTitle')}
          </h1>
        </div>
        <LanguageSwitcher />
      </header>
      <div className="w-screen flex justify-center items-center flex-col space-y-6 p-4">
        {qrCodeUrl ? (
          <div className="w-full flex flex-col items-center space-y-4">
            <p className="text-center font-medium text-sm text-gray-600 dark:text-text-primary-dark">
              Escaneie o código QR abaixo para realizar o pagamento:
            </p>
            <img
              src={qrCodeUrl}
              alt="QR Code para pagamento Bitcoin"
              className="w-64 h-64"
            />
          </div>
        ) : (
          <p className="text-center font-medium text-lg text-red-500">
            Ocorreu um erro ao gerar o QR Code. Por favor, tente novamente.
          </p>
        )}
      </div>
    </>
  );
}
