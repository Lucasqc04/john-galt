import { X } from 'lucide-react';
import React from 'react';

interface TermsAndConditionsProps {
  onClose: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center bg-orange-600 text-white">
          <h2 className="text-xl font-bold">Termos e Condições</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-orange-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold text-orange-600">
              1. Finalidade da Coleta de Dados
            </h3>
            <p>
              Os dados e documentos solicitados neste formulário são necessários
              para cumprir com as obrigações legais relacionadas à prevenção de
              fraudes, lavagem de dinheiro e financiamento ao terrorismo,
              conforme estabelecido pela legislação vigente. Além disso, estes
              dados são utilizados para verificar a identidade dos clientes e
              garantir a segurança das transações de alto valor.
            </p>

            <h3 className="text-lg font-semibold text-orange-600 mt-4">
              2. Processamento e Armazenamento
            </h3>
            <p>
              Todos os documentos enviados são processados por nossa equipe de
              compliance e armazenados em servidores seguros com criptografia de
              ponta a ponta. Os arquivos são automaticamente excluídos após 7
              dias do processamento, conforme nossa política de retenção de
              dados.
            </p>

            <h3 className="text-lg font-semibold text-orange-600 mt-4">
              3. Compartilhamento de Dados
            </h3>
            <p>
              As informações coletadas não serão compartilhadas com terceiros,
              exceto quando exigido por lei ou ordem judicial. Em caso de
              requisição legal, apenas os dados estritamente necessários serão
              compartilhados com as autoridades competentes.
            </p>

            <h3 className="text-lg font-semibold text-orange-600 mt-4">
              4. Direitos do Titular dos Dados
            </h3>
            <p>
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem
              direito a:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Acessar seus dados pessoais</li>
              <li>Solicitar a correção de dados incompletos ou imprecisos</li>
              <li>
                Solicitar a exclusão dos seus dados após o período necessário
                para cumprimento das obrigações legais
              </li>
              <li>Ser informado sobre o uso dos seus dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
            </ul>

            <h3 className="text-lg font-semibold text-orange-600 mt-4">
              5. Medidas de Segurança
            </h3>
            <p>
              Implementamos medidas técnicas e organizacionais apropriadas para
              proteger seus dados pessoais contra acesso não autorizado, perda
              acidental ou destruição. Estas medidas incluem:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Criptografia de dados em trânsito e em repouso</li>
              <li>Controles de acesso rigorosos</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>
                Treinamento regular da equipe em práticas de segurança de dados
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-orange-600 mt-4">
              6. Política de Não Discriminação
            </h3>
            <p>
              Nossa empresa está comprometida com a igualdade e não
              discriminação. Não utilizamos os dados coletados para discriminar
              clientes com base em raça, cor, origem étnica, nacionalidade,
              religião, orientação sexual, identidade de gênero, deficiência ou
              qualquer outra característica protegida por lei.
            </p>

            <h3 className="text-lg font-semibold text-orange-600 mt-4">
              7. Alterações nos Termos
            </h3>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer
              momento. As alterações entrarão em vigor imediatamente após a
              publicação dos termos atualizados em nosso site. Recomendamos que
              você revise periodicamente estes termos para estar ciente de
              quaisquer alterações.
            </p>

            <h3 className="text-lg font-semibold text-orange-600 mt-4">
              8. Contato
            </h3>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre o
              tratamento dos seus dados pessoais, entre em contato com nosso
              Encarregado de Proteção de Dados através do e-mail:
              dpo@bitcoinOtc.com.br
            </p>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Ao aceitar estes termos, você confirma que leu, compreendeu e
                concorda com as condições estabelecidas para o processamento dos
                seus dados pessoais conforme descrito acima.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
