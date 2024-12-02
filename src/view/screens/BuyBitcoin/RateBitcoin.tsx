import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import { NavBarBuyBitcoin } from './NavbarBuyBitcoin';

export function Fees() {
  return (
    <>
      <BackgroundAnimatedProduct />
      <NavBarBuyBitcoin />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">
          Taxas
        </h1>

        <section className="mb-8">
          <ul className="list-disc pl-5 text-black dark:text-white">
            <li>
              <strong>5%:</strong> Para valores acima de 1000 BRL.
            </li>
            <li>
              <strong>10%:</strong> Para valores abaixo de 1000 BRL.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            Reflexão: Bitcoin como ferramenta libertária
          </h2>
          <p className="text-black dark:text-white">
            Se o Bitcoin é realmente uma ferramenta libertária, por que os
            Governos permitem que os indivíduos ainda hoje comprem BTC
            legalmente?
          </p>
          <p className="text-black dark:text-white mt-4">
            Basicamente porque quem ainda compra bitcoin de forma "convencional"
            precisa entregar todos os detalhes pessoais à corretora, fazendo o
            famoso KYC. Desta forma, o Governo ficará sabendo de cada satoshi
            que você comprou e onde encontrá-lo.
          </p>
          <p className="text-black dark:text-white mt-4">
            É verdade que ao comprar bitcoin desta forma você paga uma pequena
            taxa a cada trade, porém, no momento do saque, além de pagar uma
            outra taxa fixa, a sua transação ficará exposta ao Leviatã, e o
            imposto será inevitável, podendo chegar a 22,5%.
          </p>
          <p className="text-black dark:text-white mt-4">
            Pois é, tal "conveniência" pode custar muito mais caro no final das
            contas. Além disso, nunca se sabe como podem manipular os seus
            detalhes pessoais.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            Privacidade e Anonimato
          </h2>
          <p className="text-black dark:text-white">
            Não é muito difícil fazer a escolha certa. Melhor garantir a sua
            privacidade e anonimato.
          </p>
          <p className="text-black dark:text-white mt-4">
            Comece a negociar agora a partir de <strong>700 BRL</strong>.
          </p>
        </section>
      </div>
    </>
  );
}
