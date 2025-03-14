import { RemoteKYCDataSource } from '@/data/datasource/RemoteKYCDataSource';
import { KYCRepositoryImpl } from '@/data/repositories/KYCRepositoryImpl';
import { KYC } from '@/domain/entities/KYC';
import { useState } from 'react';
import { toast } from 'react-toastify';

const kycRepository = new KYCRepositoryImpl(new RemoteKYCDataSource());

const useKYCForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitKYCData = async (data: KYC) => {
    console.log('🚀 Iniciando submissão de KYC:', {
      cpf: data.cpf,
      name: data.name,
      personType: data.personType,
      identificationType: data.identificationType,
      investmentAmount: data.investmentAmount,
      contactNumber: data.contactNumber,
      filesInfo: {
        identificationFile: data.identificationFile?.name,
        bankStatement: data.bankStatement?.name,
        holerite: data.holerite?.name,
        saleContract: data.saleContract?.name,
        invoice: data.invoice?.name,
        incomeDeclaration: data.incomeDeclaration?.name,
        revenueDeclaration: data.revenueDeclaration?.name,
        decore: data.decore?.name,
        balanceSheet: data.balanceSheet?.name,
        incomeStatement: data.incomeStatement?.name,
        companyBankStatement: data.companyBankStatement?.name,
        socialContract: data.socialContract?.name,
        contractAmendment: data.contractAmendment?.name,
        cnpjCard: data.cnpjCard?.name,
      },
    });

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      console.log('📤 Enviando dados para o repositório...');
      await kycRepository.submit(data);
      console.log('✅ KYC submetido com sucesso!');
      toast.success('Formulário enviado com sucesso! Aguarde aprovação.');
      setSuccess(true);
    } catch (err) {
      toast.error('Erro ao enviar formulário, entre em contato com o suporte');
      console.error('❌ Erro ao submeter KYC:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Erro desconhecido ao enviar dados',
      );
      throw err;
    } finally {
      setIsSubmitting(false);
      console.log('🏁 Processo de submissão finalizado');
    }
  };

  return { submitKYCData, isSubmitting, error, success };
};

export default useKYCForm;
