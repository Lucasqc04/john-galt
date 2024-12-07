import { BackgroundAnimatedProduct } from '../components/BackgroundAnimatedProduct';

export function VideosPage() {
  const tutorials = [
    {
      id: 1,
      title: 'Crie suas chaves off-line e carteira somente visualização',
      videoSrc: 'https://www.youtube.com/embed/M13-eb8TQJ8?si=mR5YlXyol4cm1LIC',
    },
    {
      id: 2,
      title: 'Como atualizar sua Krux Wallet',
      videoSrc: 'https://www.youtube.com/embed/Ir8ieF6WLu4?si=DWEObyAClBqtVqEG',
    },
  ];

  return (
    <>
      <BackgroundAnimatedProduct />
      <div className="min-h-screen pt-20 px-8">
        <article className="p-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-orange-primary dark:text-white">
            Videos
          </h1>
          <p className="text-lg md:text-xl text-center uppercase text-gray-700 dark:text-gray-300">
            ASSISTA AQUI VIDEOS GRATUITOS QUE PREPARAMOS ESPECIALMENTE PARA VOCÊ
            QUE ESTÁ INICIANDO
          </p>
        </article>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="flex flex-col gap-y-4 items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <h2 className="text-text-primary-light dark:text-text-primary-dark font-semibold text-lg sm:text-base text-center pt-4">
                {tutorial.title}
              </h2>
              <iframe
                width="100%"
                height="180"
                src={tutorial.videoSrc}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
