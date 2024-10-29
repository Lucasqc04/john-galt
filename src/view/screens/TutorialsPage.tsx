import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function TutorialsPage() {
  const { t } = useTranslation();
  const refSections = useRef<(HTMLDivElement | null)[]>([]);

  const tutorials = [
    {
      id: 1,
      title: t('tutorials.items.1'),
      file: '/tutorial/1° TUTORIAL - CRIE SUA CHAVE E DEPOSITE BITCOIN.pdf',
    },
    {
      id: 2,
      title: t('tutorials.items.2'),
      file: '/tutorial/2° TUTORIAL - COMO ADICIONAR UMA SENHA E CRIAR A CARTEIRA ISCA.pdf',
    },
    {
      id: 3,
      title: t('tutorials.items.3'),
      file: '/tutorial/3° TUTORIAL - RECUPERE SUA CARTEIRA E ENVIE BITCOIN.pdf',
    },
    {
      id: 4,
      title: t('tutorials.items.4'),
      file: '/tutorial/4° TUTORIAL - COMO PERFURAR A PLACA METALICA.pdf',
    },
    {
      id: 5,
      title: t('tutorials.items.5'),
      file: '/tutorial/5° TUTORIAL - COMO IMPORTAR SUA CARTEIRA NA BLUEWALLET.pdf',
    },
    {
      id: 6,
      title: t('tutorials.items.6'),
      file: '/tutorial/6° TUTORIAL - COMO MONTAR SEU PUNÇÃO AUTOMÁTICO.pdf',
    },
    {
      id: 7,
      title: t('tutorials.items.7'),
      file: '/tutorial/7° TUTORIAL -  VERIFICANDO O CÓDIGO DA KRUX.pdf',
    },
    {
      id: 8,
      title: t('tutorials.items.8'),
      file: '/tutorial/8° TUTORIAL - COMO CRIAR SUA SEEDQR.pdf',
    },
    {
      id: 9,
      title: t('tutorials.items.9'),
      file: '/tutorial/9° TUTORIAL - COMO FAZER O BACKUP NA SUA TINY SEED.pdf',
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

      <div className="mb-8 text-center">
        <div className="flex flex-wrap justify-center space-x-4">
          {tutorials.map((tutorial, index) => (
            <a
              key={tutorial.id}
              onClick={() => scrollToSection(index)}
              className="bg-[#F6911D] text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600 transition-colors mb-2 cursor-pointer"
            >
              {tutorial.title}
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial, index) => (
          <div
            key={tutorial.id}
            ref={(el) => (refSections.current[index] = el)}
            className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
              {tutorial.title}
            </h2>
            <div
              className="overflow-hidden"
              style={{ width: '100%', height: '300px' }}
            >
              <iframe
                src={tutorial.file}
                width="100%"
                height="100%"
                title={`Tutorial ${tutorial.id}`}
                style={{
                  border: 'none',
                  overflow: 'hidden',
                  display: 'block',
                  padding: 0,
                  margin: 0,
                }}
                allowFullScreen
              />
            </div>
            <a
              href={tutorial.file}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-[#F6911D] text-white px-4 py-2 rounded-md font-medium hover:bg-orange-600 transition-colors"
            >
              {t('tutorials.downloadButton')}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
