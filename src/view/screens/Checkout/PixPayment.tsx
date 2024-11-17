import { addSeconds, format } from 'date-fns';
import { FaClipboard } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

export function PixPayment() {
  const location = useLocation();
  const { total, creation, expiration, qrCodeURL, pixCopyAndPaste } =
    location.state || {};

  const creationDate = new Date(creation);
  const formattedCreationDate = format(creationDate, 'dd/MM/yyyy HH:mm:ss');

  const expirationDate = addSeconds(creationDate, expiration);
  const formattedExpirationDate = format(expirationDate, 'dd/MM/yyyy HH:mm:ss');

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCopyAndPaste).then(() => {
      alert('Código copiado para a área de transferência!');
    });
  };

  const truncatedCopyAndPaste = pixCopyAndPaste
    ? `${pixCopyAndPaste.slice(0, 30)}...`
    : '';

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col space-y-6 p-4">
      {qrCodeURL && (
        <img
          src={qrCodeURL}
          alt="QR Code"
          className="max-w-xs max-h-xs shadow-lg rounded-lg"
        />
      )}

      {total && (
        <div className="text-xl font-semibold text-gray-800">
          <p>Total: R${(total / 100).toFixed(2)}</p>
        </div>
      )}

      <div className="flex space-x-6 text-gray-700">
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
          <div className="w-full max-w-lg">
            <p className="text-center font-medium text-sm text-gray-600">
              Copie o código abaixo para completar seu pagamento:
            </p>
            <div className="w-full flex items-center justify-center bg-gray-100 rounded-lg px-4 py-2">
              <input
                type="text"
                value={truncatedCopyAndPaste}
                readOnly
                className="w-full bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
                title={pixCopyAndPaste}
              />
              <button
                onClick={handleCopy}
                className="bg-blue-600 text-white p-2 rounded-full"
                title="Clique para copiar"
              >
                <FaClipboard size={20} color="white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
