import { t } from 'i18next';
export function Services() {
  return (
    <div className="dark:bg-gray-800 dark:text-white-white grid lg:grid-cols mt-10 mb-10 p-12">
      <div className="mx-auto dark:bg-gray-800 mt-10 mb-10">
        <h1 className="dark:text-white-white text-4xl font-bold">
          {t('ServiceTitle')}
        </h1>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 shadow- ">
        <div className="mx-auto dark:bg-gray-600 w-[80%]  p-6 rounded-[12px] shadow-2xl ">
          <h1 className="dark:text-white-white text-xl- font-bold">
            Proteja e conquiste sua jornada cripto com as melhores ferramentas.
          </h1>
          <h1>
            <h1>Bitkit</h1>
          </h1>
          <p>TUDO QUE VOCÊ PRECISA EM UM BITKIT</p>
          <button className="p-3 rounded-[8px] dark:bg-orange-500  bg-orange-500 text-center w-[30%] mt-10 cursor-pointer hover:opacity-[0.4] active:scale-110 transition-transform duration-100">
            Comprar
          </button>
        </div>
        <div className="mx-auto dark:bg-gray-600 w-[80%]  p-6 rounded-[12px] shadow-2xl">
          teste
        </div>
      </div>
    </div>
  );
}
