import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import WhatsAppButton from '../../components/buttonWhatsApp';
import HeaderAlfred from './HeaderAlfred';

export function TermsOfUse() {
  return (
    <>
      <BackgroundAnimatedProduct />
      <HeaderAlfred />
      <div className="container mx-auto p-6 mt-[20%] sm:mt-[10%]">
        <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">
          Termos de Uso
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            1. Sobre a plataforma
          </h2>
          <p className="text-black dark:text-white">
            Esta é uma plataforma P2P para negociação privada de bitcoin (BTC) e
            Tether (USDT), não sendo uma exchange convencional com transações
            instantâneas.
          </p>
          <p className="text-black dark:text-white mt-4">
            O modelo de funcionamento garante que as transações sejam realizadas
            com segurança entre os usuários, sejam provedores de liquidez ou
            criadores de ordens.
          </p>
          <p className="text-black dark:text-white mt-4">
            Todos os provedores realizam um depósito em BTC que fica travado na
            plataforma, garantindo a efetividade das transações.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            2. Como as transações funcionam
          </h2>
          <ol className="list-decimal pl-5 text-black dark:text-white">
            <li>Crie um pedido no site.</li>
            <li>
              Permita que a plataforma carregue o aplicativo Telegram e cole o
              ID da ordem gerado automaticamente.
            </li>
            <li>
              Se for sua primeira transação, aceite os termos de uso para
              prosseguir.
            </li>
            <li>
              Esteja atento às instruções fornecidas e aguarde pelo atendimento
              de um provedor.
            </li>
            <li>
              A transação começará quando um provedor aceitar o pedido e
              solicitar as informações necessárias.
            </li>
          </ol>
          <p className="text-black dark:text-white mt-4">
            A conclusão do pedido acontecerá com o envio dos detalhes finais da
            ordem e a hash da transação.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            3. Duração da transação
          </h2>
          <p className="text-black dark:text-white">
            Uma transação normal pode variar de 30 minutos a 72 horas,
            dependendo de fatores como processamento bancário, apresentação de
            comprovantes e congestionamento de redes.
          </p>
          <p className="text-black dark:text-white mt-4">
            Podem ocorrer atrasos adicionais dependendo das decisões do usuário
            frente às flutuações do mercado.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            4. Políticas de KYC e responsabilidade
          </h2>
          <p className="text-black dark:text-white">
            Não exigimos KYC para o uso da plataforma. A responsabilidade sobre
            a verificação de identidade é dos bancos que permitem aos seus
            clientes utilizar uma conta.
          </p>
          <p className="text-black dark:text-white mt-4">
            Nosso papel é assegurar que as negociações sejam realizadas
            adequadamente, atuando como um marketplace de troca de valores.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            5. Alcance global e métodos de pagamento
          </h2>
          <p className="text-black dark:text-white">
            A operação é realizada globalmente, oferecendo diversas opções de
            pagamento.
          </p>
          <p className="text-black dark:text-white mt-4">
            Os provedores operam de forma independente, sem vínculos específicos
            com bancos ou entidades reguladoras.
          </p>
          <p className="text-black dark:text-white mt-4">
            O uso da plataforma implica automaticamente na aceitação integral
            dos termos de uso.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            6. Disputas e resoluções
          </h2>
          <ul className="list-disc pl-5 text-black dark:text-white">
            <li>Abra uma disputa chamando no Telegram o suporte designado.</li>
            <li>
              Penalidades financeiras serão aplicadas em casos de desonestidade.
            </li>
            <li>
              Disputas infundadas estarão sujeitas a penalidades de 10% do valor
              da ordem.
            </li>
            <li>
              A resolução normal pode levar de 7 a 30 dias, podendo se estender
              dependendo do tempo de análise de bancos.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            7. Conduta e compromisso
          </h2>
          <p className="text-black dark:text-white">
            Nosso compromisso é com um ambiente seguro e respeitoso, alinhado
            aos princípios libertários do Bitcoin.
          </p>
          <ul className="list-disc pl-5 mt-4 text-black dark:text-white">
            <li>
              <strong>10%:</strong> Difamação sem tentativa prévia de resolução.
            </li>
            <li>
              <strong>20%:</strong> Difamação durante a análise de uma
              arbitragem.
            </li>
            <li>
              <strong>100%:</strong> Tentativas de fraude ou negociações com
              fundos ilícitos.
            </li>
            <li>
              <strong>125%:</strong> Má-fé por parte do provedor ou não envio
              dos fundos à contraparte após o recebimento.
            </li>
          </ul>
          <p className="text-black dark:text-white mt-4">
            Usuários com comportamento inadequado serão banidos permanentemente.
          </p>
        </section>

        <footer className="mt-8">
          <p className="text-black dark:text-white">
            Agradecemos por escolher nossa plataforma. O compromisso é com sua
            liberdade e privacidade.
          </p>
        </footer>
      </div>
      <WhatsAppButton />
    </>
  );
}
