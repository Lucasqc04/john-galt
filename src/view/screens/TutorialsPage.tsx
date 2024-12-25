import { useTranslation } from 'react-i18next';

import como_acessar_sua_carteira_e_transferir_bitcoins from '../assets/images/tutorial/como_acessar_sua_carteira_e_transferir_bitcoins.png';
import como_adicionar_uma_senha_passphrase from '../assets/images/tutorial/como_adicionar_uma_senha_passphrase.png';
import como_montar_seu_puncao_automatico from '../assets/images/tutorial/como_montar_seu_puncao_automatico.png';
import como_realizar_o_backup_da_sua_chave_privada_seedqr from '../assets/images/tutorial/como_realizar_o_backup_da_sua_chave_privada_seedqr.png';
import como_realizar_o_backup_da_sua_chave_privada_tiniyseed from '../assets/images/tutorial/como_realizar_o_backup_da_sua_chave_privada_tiniyseed.png';
import como_recuperar_sua_conta_sem_o_dispositivo_krux from '../assets/images/tutorial/como_recuperar_sua_conta_sem_o_dispositivo_krux.png';
import crie_sua_chave_privada_e_guarde_seus_bitcoins from '../assets/images/tutorial/crie_sua_chave_privada_e_guarde_seus_bitcoins.png';
import image5 from '../assets/images/tutorial/tutorial-5.png';
import valide_o_codigo_instalado_na_sua_carteira from '../assets/images/tutorial/valide_o_codigo_instalado_na_sua_carteira.png';
import { BackgroundAnimatedProduct } from '../components/BackgroundAnimatedProduct';

export function TutorialsPage() {
  const { t } = useTranslation();

  const tutorials = [
    {
      id: 7,
      title: t('tutorials.items.7.title'),
      file: '/tutorial/valide_o_codigo_instalado_na_sua_carteira.pdf',
      image: valide_o_codigo_instalado_na_sua_carteira,
      description: t('tutorials.items.7.description'),
    },
    {
      id: 1,
      title: t('tutorials.items.1.title'),
      file: '/tutorial/crie_sua_chave_privada_e_guarde_seus_bitcoins.pdf',
      image: crie_sua_chave_privada_e_guarde_seus_bitcoins,
      description: t('tutorials.items.1.description'),
    },
    {
      id: 2,
      title: t('tutorials.items.2.title'),
      file: '/tutorial/como_adicionar_uma_senha_passphrase.pdf',
      image: como_adicionar_uma_senha_passphrase,
      description: t('tutorials.items.2.description'),
    },
    {
      id: 3,
      title: t('tutorials.items.3.title'),
      file: '/tutorial/como_acessar_sua_carteira_e_transferir_bitcoins.pdf',
      image: como_acessar_sua_carteira_e_transferir_bitcoins,
      description: t('tutorials.items.3.description'),
    },
    {
      id: 4,
      title: t('tutorials.items.4.title'),
      file: '/tutorial/como_recuperar_sua_conta_sem_o_dispositivo_krux.pdf',
      image: como_recuperar_sua_conta_sem_o_dispositivo_krux,
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
      file: '/tutorial/como_montar_seu_puncao_automatico.pdf',
      image: como_montar_seu_puncao_automatico,
      description: t('tutorials.items.6.description'),
    },
    {
      id: 9,
      title: t('tutorials.items.9.title'),
      file: '/tutorial/como_realizar_o_backup_da_sua_chave_privada_tiniyseed.pdf',
      image: como_realizar_o_backup_da_sua_chave_privada_tiniyseed,
      description: t('tutorials.items.9.description'),
    },
    {
      id: 8,
      title: t('tutorials.items.8.title'),
      file: '/tutorial/como_realizar_o_backup_da_sua_chave_privada_seedqr.pdf',
      image: como_realizar_o_backup_da_sua_chave_privada_seedqr,
      description: t('tutorials.items.8.description'),
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
              <h2 className="text-text-primary-light dark:text-text-primary-dark font-semibold text-lg sm:text-base text-center pt-4">
                {tutorial.title}
              </h2>
              <p
                className="text-gray-700 dark:text-gray-300 text-sm sm:text-xs text-center font-medium flex-grow pt-4"
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
