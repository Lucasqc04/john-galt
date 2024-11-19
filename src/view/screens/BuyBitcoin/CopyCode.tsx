import { useEffect, useState } from 'react';
import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import { NavBarBuyBitcoin } from './NavbarBuyBitcoin';

export default function CopyCode() {
  const [code, setCode] = useState('');

  const fetchCodeFromAPI = async () => {
    try {
      const fakeApiCode = '1234-5678-ABCD';
      setCode(fakeApiCode);
    } catch (error) {
      console.error('Erro ao buscar o código da API:', error);
      alert('Falha ao obter o código. Tente novamente.');
    }
  };

  useEffect(() => {
    fetchCodeFromAPI();
  }, []);

  const copyToClipboard = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      alert(
        'Código copiado para a área de transferência! Cole esse codigo na conversa',
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
              window.open(
                'https://api.whatsapp.com/send?phone=+5511919050416&text=Ol%C3%A1,%20Tudo%20bem?%0A%0AEu%20quero%20fazer%20uma%20transa%C3%A7%C3%A3o%20P2P%20com%20Bitcoin...',
                '_blank',
              )
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
