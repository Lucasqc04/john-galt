import { KYC } from '../../domain/entities/KYC';

export interface KYCDataSource {
  submitKYC(data: KYC): Promise<void>;
}

export class RemoteKYCDataSource implements KYCDataSource {
  constructor(private baseUrl: string = `${import.meta.env.VITE_API_URL}/kyc`) {
    console.log('🔧 RemoteKYCDataSource inicializado com baseUrl:', baseUrl);
  }

  async submitKYC(data: KYC): Promise<void> {
    console.log('📝 Preparando FormData para envio...');
    const formData = new FormData();

    // Adiciona campos básicos
    formData.append('cpf', data.cpf);
    formData.append('name', data.name);
    formData.append('personType', data.personType);
    formData.append('identificationType', data.identificationType);
    formData.append('termsAccepted', String(data.termsAccepted));

    // Adiciona os novos campos
    if (data.investmentAmount !== undefined && data.investmentAmount !== null) {
      formData.append('investmentAmount', String(data.investmentAmount));
    }
    if (data.contactNumber) {
      formData.append('contactNumber', data.contactNumber);
    }

    console.log('📎 Adicionando arquivos ao FormData...');

    // Adiciona arquivo de identificação
    if (data.identificationFile) {
      console.log(
        '📄 Anexando arquivo de identificação:',
        data.identificationFile.name,
      );
      formData.append('identificationFile', data.identificationFile);
    }

    // Adiciona documentos PF se existirem
    if (data.personType === 'pf') {
      console.log('👤 Processando documentos de Pessoa Física...');
      if (data.bankStatement) {
        console.log('📄 Anexando extrato bancário:', data.bankStatement.name);
        formData.append('bankStatement', data.bankStatement);
      }
      if (data.holerite) {
        console.log('📄 Anexando holerite:', data.holerite.name);
        formData.append('holerite', data.holerite);
      }
      if (data.saleContract) {
        console.log('📄 Anexando contrato de venda:', data.saleContract.name);
        formData.append('saleContract', data.saleContract);
      }
      if (data.invoice) {
        console.log('📄 Anexando nota fiscal:', data.invoice.name);
        formData.append('invoice', data.invoice);
      }
      if (data.incomeDeclaration) {
        console.log(
          '📄 Anexando declaração de IR:',
          data.incomeDeclaration.name,
        );
        formData.append('incomeDeclaration', data.incomeDeclaration);
      }
    }

    // Adiciona documentos PJ se existirem
    if (data.personType === 'pj') {
      console.log('🏢 Processando documentos de Pessoa Jurídica...');
      if (data.revenueDeclaration) {
        console.log(
          '📄 Anexando declaração de faturamento:',
          data.revenueDeclaration.name,
        );
        formData.append('revenueDeclaration', data.revenueDeclaration);
      }
      if (data.decore) {
        console.log('📄 Anexando DECORE:', data.decore.name);
        formData.append('decore', data.decore);
      }
      if (data.balanceSheet) {
        console.log('📄 Anexando balanço patrimonial:', data.balanceSheet.name);
        formData.append('balanceSheet', data.balanceSheet);
      }
      if (data.incomeStatement) {
        console.log('📄 Anexando DRE:', data.incomeStatement.name);
        formData.append('incomeStatement', data.incomeStatement);
      }
      if (data.companyBankStatement) {
        console.log(
          '📄 Anexando extrato bancário PJ:',
          data.companyBankStatement.name,
        );
        formData.append('companyBankStatement', data.companyBankStatement);
      }
      if (data.socialContract) {
        console.log('📄 Anexando contrato social:', data.socialContract.name);
        formData.append('socialContract', data.socialContract);
      }
      if (data.contractAmendment) {
        console.log(
          '📄 Anexando alteração contratual:',
          data.contractAmendment.name,
        );
        formData.append('contractAmendment', data.contractAmendment);
      }
      if (data.cnpjCard) {
        console.log('📄 Anexando cartão CNPJ:', data.cnpjCard.name);
        formData.append('cnpjCard', data.cnpjCard);
      }
    }

    console.log('🚀 Enviando requisição para:', this.baseUrl);
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.error(
        '❌ Erro na resposta do servidor:',
        response.status,
        response.statusText,
      );
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      );
    }

    console.log('✅ Dados enviados com sucesso!');
  }
}
