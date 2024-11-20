import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import image1 from '../assets/images/tutorial/tutorial-1.png';
import image2 from '../assets/images/tutorial/tutorial-2.png';
import image3 from '../assets/images/tutorial/tutorial-3.png';
import image4 from '../assets/images/tutorial/tutorial-4.png';
import image5 from '../assets/images/tutorial/tutorial-5.png';
import image6 from '../assets/images/tutorial/tutorial-6.png';
import image7 from '../assets/images/tutorial/tutorial-7.png';
import image8 from '../assets/images/tutorial/tutorial-8.png';
import image9 from '../assets/images/tutorial/tutorial-9.png';

export function TutorialsPage() {
  const { t } = useTranslation();
  const refSections = useRef<(HTMLDivElement | null)[]>([]);

  const tutorials = [
    {
      id: 1,
      title: t('tutorials.items.1.title'),
      file: '/tutorial/1° TUTORIAL - CRIE SUA CHAVE E DEPOSITE BITCOIN.pdf',
      image: image1,
      description: t('tutorials.items.1.description'),
    },
    {
      id: 2,
      title: t('tutorials.items.2.title'),
      file: '/tutorial/2° TUTORIAL - COMO ADICIONAR UMA SENHA E CRIAR A CARTEIRA ISCA.pdf',
      image: image2,
      description: t('tutorials.items.2.description'),
    },
    {
      id: 3,
      title: t('tutorials.items.3.title'),
      file: '/tutorial/3° TUTORIAL - RECUPERE SUA CARTEIRA E ENVIE BITCOIN.pdf',
      image: image3,
      description: t('tutorials.items.3.description'),
    },
    {
      id: 4,
      title: t('tutorials.items.4.title'),
      file: '/tutorial/4° TUTORIAL - COMO PERFURAR A PLACA METÁLICA.pdf',
      image: image4,
      description: t('tutorials.items.4.description'),
    },
    {
      id: 5,
      title: t('tutorials.items.5.title'),
      file: '/tutorial/5° TUTORIAL - COMO IMPORTAR SUA CARTEIRA NA BLUEWALLET.pdf',
      image: image5,
      description: t('tutorials.items.5.description'),
    },
    {
      id: 6,
      title: t('tutorials.items.6.title'),
      file: '/tutorial/6° TUTORIAL - COMO MONTAR SEU PUNÇÃO AUTOMÁTICO.pdf',
      image: image6,
      description: t('tutorials.items.6.description'),
    },
    {
      id: 7,
      title: t('tutorials.items.7.title'),
      file: '/tutorial/7° TUTORIAL - VERIFICANDO O CÓDIGO DA KRUX.pdf',
      image: image7,
      description: t('tutorials.items.7.description'),
    },
    {
      id: 8,
      title: t('tutorials.items.8.title'),
      file: '/tutorial/8° TUTORIAL - COMO CRIAR SUA SEEDQR.pdf',
      image: image8,
      description: t('tutorials.items.8.description'),
    },
    {
      id: 9,
      title: t('tutorials.items.9.title'),
      file: '/tutorial/9° TUTORIAL - COMO FAZER O BACKUP NA SUA TINY SEED.pdf',
      image: image9,
      description: t('tutorials.items.9.description'),
    },
  ];

  const scrollToSection = (index: number) => {
    const section = refSections.current[index];
    if (section) {
      const headerOffset = 115;
      const elementPosition =
        section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] dark:bg-gray-900 pt-[15%] md:pt-[10%] px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#F6911D] dark:text-white">
        {t('tutorials.title')}
      </h1>
      <p className="text-lg md:text-xl text-center mb-12 text-gray-700 dark:text-gray-300">
        {t('tutorials.description')}
      </p>

      {/* Links de navegação */}
      <div className="mb-8 text-center">
        <div className="flex flex-wrap justify-center space-x-4">
          {tutorials.map((tutorial, index) => (
            <a
              key={tutorial.id}
              onClick={() => scrollToSection(index)}
              className="text-[#F6911D] hover:text-orange-600 transition-colors mb-2 cursor-pointer text-sm md:text-base"
            >
              {tutorial.title}
            </a>
          ))}
        </div>
      </div>

      {/* Grid responsivo de tutoriais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tutorials.map((tutorial, index) => (
          <div
            key={tutorial.id}
            ref={(el) => (refSections.current[index] = el)}
            className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-[500px]" // Altura fixa para os cards
          >
            {/* Imagem do tutorial */}
            <div
              className="relative w-full"
              style={{ height: '180px', marginBottom: '15px' }}
            >
              <img
                src={tutorial.image}
                alt={`Tutorial ${tutorial.id}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Título */}
            <h2
              className="text-[#333] dark:text-white text-lg font-semibold"
              style={{
                fontFamily: 'SF UI Display',
                fontWeight: 600,
                fontSize: '18px',
                lineHeight: '22px',
              }}
            >
              {tutorial.title}
            </h2>

            {/* Descrição breve */}
            <p
              className="text-gray-700 dark:text-gray-300 text-sm text-center"
              style={{
                fontFamily: 'SF UI Display',
                fontWeight: 500,
                fontSize: 'clamp(14px, 4vw, 16px)', // Usando clamp para controlar o tamanho da fonte
                lineHeight: '1.5em', // Ajuste de line-height
                marginBottom: '15px',
                flexGrow: 1, // Flex para ocupar o espaço restante
                textAlign: 'center', // Centralizando o texto
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {tutorial.description}
            </p>

            {/* Botão de download */}
            <a
              href={tutorial.file}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F6911D] text-white px-4 py-2 rounded-md font-medium hover:bg-orange-600 transition-colors"
              style={{
                width: '100%',
                height: '40px', // Altura fixa para todos os botões
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {t('tutorials.downloadButton')}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
