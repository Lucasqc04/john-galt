import { t } from 'i18next';
import bitkit from '../../../../dist/assets/6.png';
export function Services() {
  return (
    <div className=" bg-slate-100 dark:bg-gray-800 dark:text-white-white grid lg:grid-cols mt-10 mb-10 p-12">
      <div className="mx-auto  dark:bg-gray-800 mt-10 mb-10">
        <h1 className="dark:text-white-white text-4xl font-bold">
          {t('ServiceTitle')}
        </h1>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 shadow- ">
        <div className="mx-auto bg-white dark:bg-gray-600 w-[80%]  p-6 rounded-[12px] shadow-2xl ">
          <h1 className="dark:text-white-white text-xl font-bold">
            Proteja e conquiste sua jornada cripto com as melhores ferramentas.
          </h1>
          <img
            className="mt-6 rounded-[12px] shadow transition-transform duration-800 hover:translate-y-[-10px] active:scale-110"
            src={bitkit}
            alt="bitkit"
          />
          <p className="font-medium mt-3">Tudo que você precisa em um bitkit</p>
          <button className="font-bold text-white p-3 rounded-[8px] dark:bg-orange-500 bg-orange-500 text-center w-full sm:w-[30%] mt-10 cursor-pointer hover:opacity-40 active:scale-110 transition-transform duration-100">
            Comprar
          </button>
        </div>

        <div className="mx-auto bg-white dark:bg-gray-600 w-[80%]  p-6 rounded-[12px] shadow-2xl">
          <div>
            <h3 className="dark:text-white-white text-4xl font-bold">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-base mt-6 dark:text-white-white ">
              Subscribe to our newsletter and stay up to date with the latest
              news, updates, and exclusive offers. Get valuable insights. Join
              our community today!
            </p>
            <div className="bg-transparent border border-gray-500 flex p-1 rounded-full mt-12">
              <input
                type="email"
                placeholder="Enter your email"
                className="text-gray-300 w-full outline-none bg-transparent text-sm px-4 py-3"
              />
              <button
                type="button"
                className="bg-orange-500 text-white hover:bg-orange-300 transition-all dark:text-white-white text-sm rounded-full px-6 py-3"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
