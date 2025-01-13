import { BackgroundAnimatedProduct } from '@/view/components/BackgroundAnimatedProduct';
import WhatsAppButton from '@/view/components/buttonWhatsApp';
import { useScaleFactor } from '@/view/hooks/useScaleFactor';
import { useWindowSize } from '@/view/utils/useWindowSize';
import axios from 'axios';
import classNames from 'classnames';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Header from '../Header/HeaderAlfred';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export function Support() {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const { scaleFactor } = useScaleFactor();

  const IS_LARGE_SCREEN = width >= 768;
  const IS_ZOOM_BIGGER_THAN_100 = scaleFactor > 1 && IS_LARGE_SCREEN;

  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [responseType, setResponseType] = useState<'success' | 'error' | null>(
    null,
  );

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setResponseMessage(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/support`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (response.status === 200) {
        setResponseType('success');
        setResponseMessage(t('support.successMessage'));
        reset();
      } else {
        setResponseType('error');
        setResponseMessage(t('support.errorMessage'));
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseType('error');
      setResponseMessage(t('support.errorMessage'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <span className="loader border-t-transparent border-4 border-white rounded-full w-6 h-6 animate-spin"></span>
      )}
      <BackgroundAnimatedProduct />
      <Header />
      <section
        className={classNames(
          'min-h-screen flex items-center justify-center',
          IS_ZOOM_BIGGER_THAN_100 && 'pt-16',
        )}
      >
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <aside className="col-span-full md:col-span-6 flex flex-col items-center">
              <h1 className="text-[#F39200] dark:text-[#F39200] font-black text-5xl sm:text-6xl lg:text-7xl flex items-center pb-4">
                ALFRED
              </h1>

              <div className="flex flex-col gap-6 w-full max-w-[368px]">
                <a
                  href="https://chat.whatsapp.com/HtFSC2xozFhLEFxaDf5Psx"
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

            <article className="col-span-full md:col-span-6 flex items-center justify-center">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-[370px] bg-white dark:bg-gray-800 p-8 rounded-lg flex flex-col gap-y-6"
              >
                <h3 className="font-bold text-lg md:text-2xl text-center text-gray-900 dark:text-gray-100">
                  {t('support.sendMessage')}
                </h3>

                {responseMessage && (
                  <p
                    className={classNames(
                      'text-center font-medium',
                      responseType === 'success' && 'text-green-600',
                      responseType === 'error' && 'text-red-600',
                    )}
                  >
                    {responseMessage}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    {...register('firstName', { required: true })}
                    placeholder={t('support.firstName')}
                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <input
                    type="text"
                    {...register('lastName', { required: true })}
                    placeholder={t('support.lastName')}
                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  placeholder={t('support.email')}
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <textarea
                  {...register('message', { required: true })}
                  placeholder={t('support.message')}
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                ></textarea>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-bold transition bg-black hover:bg-gray-800 text-white dark:bg-gray-900 dark:hover:bg-blue-800 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {t('support.send')}
                </button>
              </form>
            </article>
          </div>
        </div>
      </section>
      <WhatsAppButton />
    </>
  );
}
