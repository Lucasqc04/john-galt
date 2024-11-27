import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ThemeMode } from '../../domain/entities/theme.entity';
import logoBlack from '../assets/logo/logo-complete-black.png';
import logoWhite from '../assets/logo/logo-complete-white.png';
import { BackgroundAnimatedProduct } from '../components/BackgroundAnimatedProduct';
import { useHeader } from '../layout/Header/useHeader';

export function Support() {
  const { t } = useTranslation();
  const currentTheme = localStorage.getItem('theme');
  const { theme } = useHeader();

  useEffect(() => {
    document.documentElement.classList.toggle(
      ThemeMode.dark,
      currentTheme === ThemeMode.dark,
    );
  }, [currentTheme]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    fetch('/api/support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        alert(t('support.successMessage'));
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(t('support.errorMessage'));
      });
  };

  return (
    <>
      <BackgroundAnimatedProduct />
      <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
          {/* Container Central */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Redes Sociais */}
            <aside className="col-span-full md:col-span-6 flex flex-col items-center">
              {/* Logo */}
              <img
                src={theme.isDarkTheme ? logoWhite : logoBlack}
                alt="Logo"
                className="w-[150px] h-auto mb-8"
              />

              {/* Redes Sociais */}
              <div className="flex flex-col gap-6 w-full max-w-[368px]">
                <a
                  href="https://api.whatsapp.com/send?phone=+5511919050416&text=Ol%C3%A1,%20Tudo%20bem?%0A%0AEu%20gostaria%20de%20ajuda%20do%20suporte%20da%20DIY%20SECURITY%20LAB..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-[24px] shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <FaWhatsapp size={32} className="text-green-500" />
                  <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    WhatsApp
                  </span>
                </a>
                <a
                  href="https://www.instagram.com/diyseclab.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-[24px] shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <FaInstagram size={32} className="text-pink-500" />
                  <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    Instagram
                  </span>
                </a>
                <a
                  href="https://x.com/diyseclab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-[24px] shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <FaXTwitter
                    size={32}
                    className="text-black dark:text-white"
                  />
                  <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    X
                  </span>
                </a>
              </div>
            </aside>

            {/* Formulário */}
            <article className="col-span-full md:col-span-6 flex items-center justify-center">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-[370px] bg-white dark:bg-gray-800 p-8 rounded-lg flex flex-col gap-y-6"
              >
                <h3 className="font-bold text-lg md:text-2xl text-center text-gray-900 dark:text-gray-100">
                  {t('support.sendMessage')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="firstName"
                    placeholder={t('support.firstName')}
                    required
                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder={t('support.lastName')}
                    required
                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder={t('support.email')}
                  required
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <textarea
                  name="message"
                  placeholder={t('support.message')}
                  required
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                ></textarea>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-bold transition bg-black hover:bg-gray-800 text-white dark:bg-gray-900 dark:hover:bg-blue-800"
                >
                  {t('support.send')}
                </button>
              </form>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
