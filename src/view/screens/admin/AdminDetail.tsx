import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface KYCRecord {
  id: string;
  cpf: string;
  name: string;
  status: string;
  identificationFileUrl: string;
  bankStatementUrl?: string;
  holeriteUrl?: string;
  saleContractUrl?: string;
  invoiceUrl?: string;
  incomeDeclarationUrl?: string;
  revenueDeclarationUrl?: string;
  decoreUrl?: string;
  balanceSheetUrl?: string;
  incomeStatementUrl?: string;
  companyBankStatementUrl?: string;
  socialContractUrl?: string;
  contractAmendmentUrl?: string;
  cnpjCardUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const KYCDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState<KYCRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/kyc/${id}`,
        );
        const data = await response.json();
        if (data.success) {
          setRecord(data.data);
        } else {
          setError(data.message || 'Erro ao carregar detalhes.');
        }
      } catch (err) {
        console.error('Erro ao buscar detalhes do KYC:', err);
        setError('Erro ao buscar detalhes do KYC.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Registro não encontrado.</p>
      </div>
    );
  }

  // Filtra as propriedades que terminam com "Url" e possuem valor
  const fileEntries = Object.entries(record).filter(
    ([key, value]) => key.endsWith('Url') && value,
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-orange-600 underline"
      >
        Voltar
      </button>
      <h2 className="text-2xl font-bold mb-4">Detalhes do KYC</h2>
      <div className="bg-white shadow rounded p-6 mb-6">
        <p>
          <strong>CPF:</strong> {record.cpf}
        </p>
        <p>
          <strong>Nome:</strong> {record.name}
        </p>
        <p>
          <strong>Status:</strong> {record.status}
        </p>
        <p>
          <strong>Data de Submissão:</strong>{' '}
          {new Date(record.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Última Atualização:</strong>{' '}
          {new Date(record.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <h3 className="text-xl font-semibold mb-2">Arquivos Enviados</h3>
      {fileEntries.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {fileEntries.map(([key, value]) => {
            // Formata o nome do campo: remove "Url" e adiciona espaços antes de maiúsculas
            const label = key
              .replace('Url', '')
              .replace(/([A-Z])/g, ' $1')
              .trim();
            return (
              <li key={key}>
                <span className="font-medium">{label}:</span>{' '}
                <a
                  href={value as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Visualizar
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Nenhum arquivo encontrado.</p>
      )}
    </div>
  );
};

export default KYCDetail;
