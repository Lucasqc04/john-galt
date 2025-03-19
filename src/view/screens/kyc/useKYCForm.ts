import { RemoteKYCDataSource } from '@/data/datasource/RemoteKYCDataSource';
import { KYCRepositoryImpl } from '@/data/repositories/KYCRepositoryImpl';
import { KYC } from '@/domain/entities/KYC';
import { ROUTES } from '@/view/routes/Routes';
import { useCurrentLang } from '@/view/utils/useCurrentLang';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegação
import { toast } from 'react-toastify';

const kycRepository = new KYCRepositoryImpl(new RemoteKYCDataSource());

const useKYCForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { currentLang } = useCurrentLang();

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

      // Salva os dados do formulário no sessionStorage
      sessionStorage.setItem('cpf', data.cpf || '');
      sessionStorage.setItem('name', data.name || '');
      sessionStorage.setItem(
        'investmentAmount',
        (data.investmentAmount ?? 0).toString(),
      );
      sessionStorage.setItem('contactNumber', data.contactNumber || '');
      sessionStorage.setItem('personType', data.personType || '');
      sessionStorage.setItem(
        'identificationType',
        data.identificationType || '',
      );

      // Salva apenas o nome dos arquivos no sessionStorage
      const fileKeys = [
        'identificationFile',
        'bankStatement',
        'holerite',
        'saleContract',
        'invoice',
        'incomeDeclaration',
        'revenueDeclaration',
        'decore',
        'balanceSheet',
        'incomeStatement',
        'companyBankStatement',
        'socialContract',
        'contractAmendment',
        'cnpjCard',
      ];
      for (const key of fileKeys) {
        const file = data[key as keyof KYC] as File | undefined;
        sessionStorage.setItem(key, file ? file.name : '');
      }

      toast.success('Formulário enviado com sucesso! Aguarde aprovação.');
      setSuccess(true);

      // Redireciona para a página de sucesso
      navigate(ROUTES.otcsuccess.call(currentLang));
    } catch (err) {
      console.error('❌ Erro ao submeter KYC:', err);
      if (
        err instanceof Error &&
        err.message.includes('Unique constraint failed on the fields: (`cpf`)')
      ) {
        setError(
          'Este CPF já está cadastrado. Por favor, verifique ou entre em contato com o suporte.',
        );
        toast.error(
          'Este CPF já está cadastrado. Por favor, verifique ou entre em contato com o suporte.',
        );
      } else {
        setError('Erro ao enviar formulário, entre em contato com o suporte');
        toast.error(
          'Erro ao enviar formulário, entre em contato com o suporte',
        );
      }
    } finally {
      setIsSubmitting(false);
      console.log('🏁 Processo de submissão finalizado');
    }
  };

  return { submitKYCData, isSubmitting, error, success };
};

export default useKYCForm;
