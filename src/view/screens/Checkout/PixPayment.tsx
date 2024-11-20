import { addSeconds, format } from 'date-fns';
import { t } from 'i18next';
import { FaClipboard } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import GenericQR from '../../assets/qr-generic.svg';
import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import { LanguageSwitcher } from '../../components/LanguageSwitcher/LanguageSwitcher';

export function PixPayment() {
  const location = useLocation();
  const { total, creation, expiration, qrCodeURL, pixCopyAndPaste } =
    location.state || {};
  const navigate = useNavigate();

  const creationDate = new Date(creation);
  const formattedCreationDate = format(creationDate, 'dd/MM/yyyy HH:mm:ss');

  const expirationDate = addSeconds(creationDate, expiration);
  const formattedExpirationDate = format(expirationDate, 'dd/MM/yyyy HH:mm:ss');

  const handleCopy = () => {
    if (pixCopyAndPaste) {
      navigator.clipboard
        .writeText(pixCopyAndPaste)
        .then(() => {
          alert('Código copiado para a área de transferência!');
        })
        .catch(() => alert('Erro ao copiar código!'));
    }
  };

  const truncatedCopyAndPaste = pixCopyAndPaste
    ? `${pixCopyAndPaste.slice(0, 30)}...`
    : '';

  return (
    <>
      <BackgroundAnimatedProduct />
      <header className="px-4 pt-10 flex items-start justify-between dark:text-white">
        <div className="flex items-center gap-x-4">
          <button onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack
              size={28}
              className="text-gray-900 dark:text-white"
            />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t('checkout.title')}
          </h1>
        </div>
        <LanguageSwitcher />
      </header>
      <div className="w-screen flex justify-center items-center flex-col space-y-6 p-4">
        {qrCodeURL && (
          <img
            src={qrCodeURL ?? GenericQR}
            alt="QR Code"
            className="max-w-xs max-h-xs shadow-lg rounded-lg dark:bg-primary-light"
          />
        )}

        {total && (
          <div className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
            <p>Total: R${total.toFixed(2)}</p>
          </div>
        )}

        <div className="flex space-x-6 text-gray-700 dark:text-text-primary-dark">
          <div>
            <p className="font-medium">Criado em:</p>
            <p>{formattedCreationDate || 'Data inválida'}</p>
          </div>
          <div>
            <p className="font-medium">Expira em:</p>
            <p>{formattedExpirationDate || 'Data inválida'}</p>
          </div>
        </div>

        {pixCopyAndPaste && (
          <div className="w-full flex flex-col items-center space-y-4">
            <div className="w-full max-w-lg flex flex-col gap-y-2">
              <p className="text-center font-medium text-sm text-gray-600 dark:text-text-primary-dark">
                Copie o código abaixo para completar seu pagamento:
              </p>
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2"
              >
                <span className="w-full bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer">
                  {truncatedCopyAndPaste}
                </span>
                <div
                  className="bg-blue-600 text-white p-2 rounded-full cursor-pointer"
                  title="Clique para copiar"
                >
                  <FaClipboard size={20} color="white" />
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
