import { BackgroundAnimated } from '../components/BackgroundAnimated';

export function About() {
  return (
    <>
      <BackgroundAnimated />
      <section className="grid grid-cols-1 md:grid-cols-12 px-8 md:px-16 min-h-screen pt-36 md:pt-0">
        <article className="h-full col-span-full md:col-span-6 flex flex-col gap-y-4 items-center justify-center px-12 md:px-0">
          <h3 className="text-center font-bold text-sm md:text-2xl">
            Manifesto DIY Security Lab
          </h3>
          <span className="text-center font-semibold text-xs md:text-xl">
            Bitcoin, Liberdade e Soberania
          </span>
        </article>
        <article className="h-full col-span-full md:col-span-6 flex flex-col gap-y-4 items-center md:items-start justify-center py-6 md:px-4">
          <p className="text-justify text-sm">
            Na DIY Sec Lab, acreditamos profundamente no Bitcoin como uma
            ferramenta de emancipação individual. Ele não é apenas uma moeda
            digital, mas um símbolo de liberdade e soberania, permitindo que
            cada pessoa tome o controle de seu próprio destino, sem depender de
            intermediários ou instituições centralizadas.
          </p>
          <p className="text-justify text-sm">
            Sabemos que a verdadeira liberdade só é possível com segurança. É
            por isso que defendemos o armazenamento offline das criptomoedas,
            onde o usuário é o único guardião de seus ativos. Nosso compromisso
            é facilitar esse processo, tornando acessível a todos a
            possibilidade de proteger seus fundos de forma independente e
            segura, longe das ameaças digitais.
          </p>
          <p className="text-justify text-sm">
            O Bitcoin abre caminho para um futuro onde o poder volta às mãos das
            pessoas. Na DIY Sec Lab, nossa missão é apoiar essa jornada,
            oferecendo as ferramentas e o conhecimento necessários para que cada
            indivíduo possa viver essa soberania com confiança, simplicidade e
            responsabilidade. Acreditamos que o Bitcoin é a chave para a
            verdadeira autonomia, e estamos aqui para ajudar a abrir essa porta.
          </p>
        </article>
      </section>
    </>
  );
}
