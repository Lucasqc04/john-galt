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
import { BackgroundAnimatedProduct } from '../components/BackgroundAnimatedProduct';

export function TutorialsPage() {
  const { t } = useTranslation();

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

  return (
    <>
      <BackgroundAnimatedProduct />
      <div className="min-h-screen pt-20 px-8">
        <article className="py-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-orange-primary dark:text-white">
            {t('tutorials.title')}
          </h1>
          <p className="text-lg md:text-xl text-center uppercase text-gray-700 dark:text-gray-300">
            {t('tutorials.description')}
          </p>
        </article>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-[500px]"
            >
              <img
                src={tutorial.image}
                alt={`Tutorial ${tutorial.id}`}
                className="object-cover rounded-lg relative w-full h-[180px]"
              />
              <h2 className="text-text-primary-light dark:text-text-primary-dark font-semibold text-lg text-center pt-4">
                {tutorial.title}
              </h2>
              <p
                className="text-gray-700 dark:text-gray-300 text-sm text-center font-medium flex-grow pt-4"
                style={{
                  fontSize: 'clamp(14px, 4vw, 16px)',
                }}
              >
                {tutorial.description}
              </p>
              <a
                href={tutorial.file}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 bg-orange-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors text-center"
              >
                {t('tutorials.downloadButton')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
