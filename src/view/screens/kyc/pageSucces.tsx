import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logoSucces from '../../assets/Check_Tela_Alfred.png'; // Check reduzido
import { ROUTES } from '../../routes/Routes';

// Tipagem para os arquivos enviados
interface SubmittedFile {
  name: string;
  fileName: string; // Aqui armazenamos apenas o nome do arquivo
}

// Tipagem para os dados do formulário
interface FormData {
  name?: string | null;
  cpf?: string | null;
  contactNumber?: string | null;
  investmentAmount?: string | null;
}

export function FormOtcSuccess() {
  const navigate = useNavigate();
  const [, setWindowWidth] = useState(window.innerWidth);
  const [submittedFiles, setSubmittedFiles] = useState<SubmittedFile[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [isFileOpen, setIsFileOpen] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Buscar dados do formulário no sessionStorage
    const formDataFromSession: FormData = {
      name: sessionStorage.getItem('name'),
      cpf: sessionStorage.getItem('cpf'),
      contactNumber: sessionStorage.getItem('contactNumber'),
      investmentAmount: sessionStorage.getItem('investmentAmount'),
    };
    setFormData(formDataFromSession);

    // Definir as chaves de arquivos e buscar os nomes no sessionStorage
    const fileKeys = [
      { name: 'Documento de Identificação', key: 'identificationFile' },
      { name: 'Extrato Bancário', key: 'bankStatement' },
      { name: 'Holerite', key: 'holerite' },
      { name: 'Contrato de Compra e Venda', key: 'saleContract' },
      { name: 'Nota Fiscal (NF)', key: 'invoice' },
      { name: 'Declaração de Imposto de Renda', key: 'incomeDeclaration' },
      { name: 'Declaração de Faturamento', key: 'revenueDeclaration' },
      { name: 'DECORE', key: 'decore' },
      { name: 'Balanço Patrimonial', key: 'balanceSheet' },
      { name: 'Contrato Social', key: 'socialContract' },
      { name: 'Cartão CNPJ', key: 'cnpjCard' },
      { name: 'Extrato Bancário da Empresa', key: 'companyBankStatement' },
    ];

    const files: SubmittedFile[] = fileKeys
      .map((file) => ({
        name: file.name,
        fileName: sessionStorage.getItem(file.key) || '',
      }))
      .filter((file) => file.fileName !== '');

    setSubmittedFiles(files);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleFile = (fileName: string) => {
    setIsFileOpen((prev) => ({ ...prev, [fileName]: !prev[fileName] }));
  };

  const handleOnLink = (path: string) => {
    navigate(path);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col justify-center items-center px-6 text-center relative text-white bg-transparent"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
      >
        <img src={logoSucces} alt="check" className="w-48" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-4"
      >
        Formulário enviado com sucesso!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-lg md:text-xl mb-8 max-w-xl text-gray-100"
      >
        Seus dados foram recebidos com sucesso e estamos processando sua
        verificação. A análise do seu pagamento está em andamento.
      </motion.p>

      {/* Toggle Files Section */}
      <div className="w-full max-w-2xl bg-black bg-opacity-70 rounded-lg p-6 mb-6 shadow-lg border border-white">
        <h3 className="text-xl font-semibold mb-4 text-white">
          Arquivos Enviados:
        </h3>
        <ul className="space-y-3">
          {submittedFiles.length === 0 && (
            <p className="text-white">Nenhum arquivo enviado.</p>
          )}
          {submittedFiles.map((file, index) => (
            <li key={index} className="text-white">
              <button
                onClick={() => handleToggleFile(file.fileName)}
                className="w-full text-left py-2 px-4 bg-gray-800 rounded-md focus:outline-none hover:bg-gray-700 transition duration-200"
              >
                {file.name}
              </button>
              {isFileOpen[file.fileName] && (
                <div className="mt-2 p-4 bg-gray-700 rounded-md text-white">
                  <p>{file.name}</p>
                  <p>{file.fileName}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* User Data Section */}
      <div className="w-full max-w-2xl bg-black bg-opacity-70 rounded-lg p-6 mb-6 shadow-lg border border-white">
        <h3 className="text-xl font-semibold mb-4 text-white">
          Dados do Usuário:
        </h3>
        <div className="space-y-3 text-white">
          {formData.name && (
            <div>
              <strong>Nome Completo:</strong>
              <p>{formData.name}</p>
            </div>
          )}
          {formData.cpf && (
            <div>
              <strong>CPF:</strong>
              <p>{formData.cpf}</p>
            </div>
          )}
          {formData.contactNumber && (
            <div>
              <strong>Número de Contato:</strong>
              <p>{formData.contactNumber}</p>
            </div>
          )}
          {formData.investmentAmount && (
            <div>
              <strong>Valor do Investimento:</strong>
              <p>{formData.investmentAmount}</p>
            </div>
          )}
        </div>
      </div>

      {/* User Confirmation Message */}
      <div className="mt-6 p-4 bg-black bg-opacity-70 border border-white rounded-lg">
        <h3 className="font-medium text-white mb-2">
          Nossa equipe irá entrar em contato com você para finalizar o processo
          de verificação.
        </h3>
        <p className="text-white text-sm mt-1">
          A análise do seu pagamento está em andamento e será confirmada em
          breve.
        </p>
      </div>

      {/* Buttons for Contact and Redirect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 mt-8"
      >
        <button
          onClick={() => handleOnLink(ROUTES.buyBitcoin.call('pt'))}
          className="w-[200px] h-[50px] bg-[#F49300] border-[3px] border-white rounded-[40px] text-white"
        >
          Voltar para o site
        </button>
        <button
          onClick={() =>
            window.open(
              'https://api.whatsapp.com/send?phone=+5511919050416&text=Meu%20pagamento%20foi%20concluído%20e%20tenho%20algumas%20dúvidas.%20Poderia%20me%20ajudar?',
              '_blank',
            )
          }
          className="bg-black w-[200px] h-[50px] text-[#00FC00] border-[3px] border-[#00FC00] rounded-[40px] flex items-center justify-center gap-2"
        >
          Falar no WhatsApp <FaWhatsapp />
        </button>
      </motion.div>
    </motion.div>
  );
}
