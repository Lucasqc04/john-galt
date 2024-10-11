import StatisticsImage from '../../assets/images/Statistics/Statistics.jfif';

export function Statistics() {
  return (
    <div id="statistics" className="relative flex flex-col shadow-sm">
      <div className="bg-primary-dark w-full py-12 px-6 sm:px-4 md:px-8 z-10 min-h-[80vh]">
        <section className="flex flex-col gap-y-10">
          <article className="w-full flex justify-center pt-12">
            <h3 className="max-w-2xl text-4xl text-center font-bold text-white whitespace-pre-wrap break-words">
              A DIY LAB está revolucionando a soberania cripto no Brasil -
              demais opções
            </h3>
          </article>
          <article className="flex flex-wrap justify-around gap-y-4 pb-32 md:pb-0">
            <div>
              <h4 className="text-center text-white text-sm font-bold">
                + 2 Mil
              </h4>
              <p className="text-center text-white text-sm">
                Bitcoiners nas comunidades DIY
              </p>
            </div>
            <div>
              <h4 className="text-center text-white text-sm font-bold">
                + WEB3
              </h4>
              <p className="text-center text-white text-sm">
                Eliminando Intermediários e Empoderando Usuários
              </p>
            </div>
            <div>
              <h4 className="text-center text-white text-sm font-bold">
                + 20 Mil
              </h4>
              <p className="text-center text-white text-sm">
                Pessoas nos acompanhando nas redes
              </p>
            </div>
            <div>
              <h4 className="text-center text-white text-sm font-bold">
                Global
              </h4>
              <p className="text-center text-white text-sm">
                Tenha um controle cripto em qualquer lugar
              </p>
            </div>
          </article>
        </section>
      </div>

      <div className="w-full flex justify-center -mt-32 md:-mt-64 z-20">
        <img
          src={StatisticsImage}
          alt="Estatísticas"
          className="w-2/3 lg:w-1/3 object-cover relative z-20"
        />
      </div>

      <div className="bg-primary-light w-full py-12 px-6 sm:px-4 md:px-8 z-10 h-[20vh]">
        <section className="pt-4 w-full flex justify-center">
          <h3 className="max-w-2xl text-4xl text-center font-bold text-black whitespace-pre-wrap break-words">
            BITCOINERS QUE FORAM TRANSFORMADOS PELO BITKIT
          </h3>
        </section>
      </div>
    </div>
  );
}
