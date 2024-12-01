import { useEffect, useState } from 'react';
import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import { NavBarBuyBitcoin } from './NavbarBuyBitcoin';

export default function CopyCode() {
  const [code, setCode] = useState('');

  useEffect(() => {
    const storedOrderId = localStorage.getItem('orderId');
    if (storedOrderId) {
      setCode(storedOrderId);
    }
  }, []);

  const copyToClipboard = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      alert(
        'Código copiado para a área de transferência! Cole esse código na conversa',
      );
    } else {
      alert('Nenhum código disponível para copiar.');
    }
  };

  return (
    <>
      <NavBarBuyBitcoin />
      <BackgroundAnimatedProduct />
      <div className="min-h-screen flex flex-col items-center">
        <div className="flex flex-col items-center mt-10 px-4 w-full sm:w-auto">
          <input
            type="text"
            value={code}
            readOnly
            placeholder="Código será exibido aqui"
            className="border px-4 py-3 rounded-3xl text-lg text-black dark:text-white bg-slate-100 dark:bg-slate-700 w-full sm:w-80 lg:w-96"
          />
          <button
            onClick={copyToClipboard}
            className="mt-4 px-6 py-3 bg-[#F6911D] text-white rounded-3xl font-bold hover:bg-orange-400"
          >
            Copiar Código
          </button>
        </div>

        <div className="flex justify-center mt-6 w-full px-4 sm:w-auto">
          <button
            onClick={() =>
              window.open('https://t.me/diyseclab_alfred_bot', '_blank')
            }
            className="w-full sm:w-48 lg:w-56 h-12 bg-[#F6911D] text-black dark:text-white rounded-3xl font-bold hover:bg-orange-400"
          >
            Prosseguir
          </button>
        </div>
      </div>
    </>
  );
}
