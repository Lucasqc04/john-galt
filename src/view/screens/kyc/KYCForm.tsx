import { KYC } from '@/domain/entities/KYC';
import WhatsAppButton from '@/view/components/buttonWhatsApp';
import { t } from 'i18next';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { z } from 'zod';
import {
  defaultKYCFormData,
  KYCFormData,
  kycFormSchema,
} from '../../../data/model/kyc';
import FileUploadField from './FileUploadField';
import TermsAndConditions from './TermsAndConditions';
import useKYCForm from './useKYCForm';

const KYCForm: React.FC = () => {
  const { submitKYCData, isSubmitting, error, success } = useKYCForm();

  // Form state
  const [formData, setFormData] = useState<KYCFormData>(defaultKYCFormData);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const brlValueString =
      localStorage.getItem('brlAmount')?.replace(/\D/g, '') || '0';
    const numericBRL = parseInt(brlValueString, 10);
    if (numericBRL > 5000) {
      toast.info(t('checkout.payment_error_above_5000'));
    }
  }, []);

  // Handle text input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({ ...prev, [name]: checked }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle file input changes
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      sessionStorage.setItem(name, files[0].name);
      if (validationErrors[name]) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: null }));
      sessionStorage.removeItem(name);
    }
  };

  // Format CPF as user types
  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length <= 11) {
      value = value
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

      setFormData((prev) => ({ ...prev, cpf: value }));

      if (validationErrors.cpf) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.cpf;
          return newErrors;
        });
      }
    }
  };

  // Toggle terms modal
  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  // Validate form and submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('🚀 Iniciando submissão do formulário...');

    try {
      console.log('✨ Validando dados do formulário...');
      kycFormSchema.parse(formData);

      const newErrors: Record<string, string> = {};

      if (!formData.identificationFile) {
        console.warn('❌ Documento de identificação não fornecido');
        newErrors.identificationFile =
          'Documento de identificação é obrigatório';
      }

      if (formData.personType === 'pf') {
        const hasPfDocument =
          formData.bankStatement ||
          formData.holerite ||
          formData.saleContract ||
          formData.invoice ||
          formData.incomeDeclaration;

        if (!hasPfDocument) {
          console.warn('❌ Nenhum documento financeiro PF fornecido');
          newErrors.pfDocuments =
            'Pelo menos um documento de comprovação financeira é obrigatório';
        }
      }

      if (formData.personType === 'pj') {
        if (!formData.socialContract) {
          console.warn('❌ Contrato Social não fornecido');
          newErrors.socialContract =
            'Contrato Social é obrigatório para Pessoa Jurídica';
        }
        if (!formData.cnpjCard) {
          console.warn('❌ Cartão CNPJ não fornecido');
          newErrors.cnpjCard = 'Cartão CNPJ é obrigatório para Pessoa Jurídica';
        }

        const investmentAmount = Number(formData.investmentAmount) || 0;
        if (investmentAmount <= 0) {
          console.warn('❌ Valor do investimento inválido');
          newErrors.investmentAmount =
            'O valor do investimento deve ser maior que zero';
        }

        if (
          !formData.contactNumber ||
          !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(formData.contactNumber)
        ) {
          console.warn('❌ Número de contato inválido');
          newErrors.contactNumber = 'Formato inválido. Use (99) 99999-9999';
        }

        const hasPjFinancialDocument =
          formData.revenueDeclaration ||
          formData.decore ||
          formData.balanceSheet ||
          formData.incomeStatement ||
          formData.companyBankStatement;

        if (!hasPjFinancialDocument) {
          console.warn('❌ Nenhum documento financeiro PJ fornecido');
          newErrors.pjDocuments =
            'Pelo menos um documento de comprovação financeira é obrigatório';
        }
      }

      if (!formData.termsAccepted) {
        console.warn('❌ Termos não aceitos');
        newErrors.termsAccepted =
          'Você precisa aceitar os termos para continuar';
      }

      if (Object.keys(newErrors).length > 0) {
        console.warn('❌ Erros de validação encontrados:', newErrors);
        setValidationErrors(newErrors);
        return;
      }

      console.log('✅ Validação concluída com sucesso');
      console.log('📤 Enviando dados do formulário...');
      await submitKYCData(formData as unknown as KYC);

      console.log('✅ Formulário enviado com sucesso!');
    } catch (err) {
      console.error('❌ Erro na submissão:', err);
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path) {
            errors[error.path[0].toString()] = error.message;
          }
        });
        setValidationErrors(errors);
      } else {
        console.error('Form submission error:', err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-transparent rounded-xl shadow-lg p-8 border border-white">
        <h1 className="text-2xl font-bold text-orange-600 mb-6">
          Validação para Transações Anônimas
        </h1>

        <div className="mb-6 p-4 bg-black bg-opacity-70 border border-white rounded-lg flex items-start">
          <Info className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-white">
              Por que solicitamos esses documentos?
            </h3>
            <p className="text-white text-sm mt-1">
              O Alfred opera com foco na liberdade financeira, garantindo um
              ambiente seguro e sem interferências. Para evitar impactos
              indesejados, realizo um reconhecimento da origem dos fundos antes
              de liberar transações de alto valor.
            </p>
            <p className="text-white text-sm mt-1">
              Os documentos solicitados nesse processo são excluídos
              imediatamente após a verificação, sem qualquer tipo de declaração
              ou armazenamento. Dessa forma, todas as transações permanecem
              totalmente anônimas e sem rastros.
            </p>
            <p className="text-white text-sm mt-1">
              Após a verificação dos dados enviados, nossa equipe entrará em
              contato pelo número informado para liberar o pagamento.
            </p>
          </div>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-800">
                Formulário enviado com sucesso!
              </h3>
              <p className="text-green-700 text-sm mt-1">
                Seus documentos foram recebidos e estão em análise. Você
                receberá uma notificação quando o processo for concluído.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800">
                Erro ao enviar formulário
              </h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-transparent p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-orange-600 mb-4">
              1. Dados do Cliente
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="cpf"
                  className="block text-sm font-medium text-gray-100 mb-1"
                >
                  CPF <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleCpfChange}
                  placeholder="000.000.000-00"
                  className={`w-full p-2 bg-transparent border-2 rounded-lg ${validationErrors.cpf ? 'border-red-500' : 'border-white'} focus:outline-none focus:ring-2 focus:ring-orange-500 text-white`}
                  required
                />
                {validationErrors.cpf && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.cpf}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-100 mb-1"
                >
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-2 bg-transparent border-2 rounded-lg ${validationErrors.name ? 'border-red-500' : 'border-white'} focus:outline-none focus:ring-2 focus:ring-orange-500 text-white`}
                  required
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.name}
                  </p>
                )}
              </div>
            </div>

            {/* Valor do Investimento */}
            <div className="mb-4">
              <label
                htmlFor="investmentAmount"
                className="block text-sm font-medium text-gray-100 mb-1"
              >
                Valor do Investimento (R$){' '}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="investmentAmount"
                name="investmentAmount"
                value={formData.investmentAmount ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    investmentAmount: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  }))
                }
                placeholder="Digite o valor do investimento"
                className={`w-full p-3 bg-transparent border-2 rounded-lg ${
                  validationErrors.investmentAmount
                    ? 'border-red-500'
                    : 'border-white'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 text-white`}
                required
              />
              {validationErrors.investmentAmount && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.investmentAmount}
                </p>
              )}
            </div>

            {/* Número de Contato */}
            <div className="mb-4">
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-100 mb-1"
              >
                Número de Contato <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    contactNumber: e.target.value,
                  }))
                }
                placeholder="(99) 99999-9999"
                className={`w-full p-3 bg-transparent border-2 rounded-lg ${
                  validationErrors.contactNumber
                    ? 'border-red-500'
                    : 'border-white'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 text-white`}
                required
              />
              {validationErrors.contactNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.contactNumber}
                </p>
              )}
            </div>
          </div>

          <div className="bg-transparent p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-orange-600 mb-4">
              2. Identificação Pessoal
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-100 mb-2">
                Tipo de Pessoa <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="personType"
                    value="pf"
                    checked={formData.personType === 'pf'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-600"
                  />
                  <span className="ml-2 text-white">Pessoa Física</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="personType"
                    value="pj"
                    checked={formData.personType === 'pj'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-600"
                  />
                  <span className="ml-2 text-white">Pessoa Jurídica</span>
                </label>
              </div>
              {validationErrors.personType && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.personType}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="identificationType"
                className="block text-sm font-medium text-gray-100 mb-1"
              >
                Tipo de Documento <span className="text-red-500">*</span>
              </label>
              <select
                id="identificationType"
                name="identificationType"
                value={formData.identificationType}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${
                  validationErrors.identificationType
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                required
              >
                <option value="CNH">CNH</option>
                <option value="RG">RG</option>
              </select>
              {validationErrors.identificationType && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.identificationType}
                </p>
              )}
            </div>

            <FileUploadField
              id="identificationFile"
              label="Documento de Identificação"
              onChange={handleFileChange}
              error={validationErrors.identificationFile}
              required
              selectedFile={formData.identificationFile}
            />
          </div>

          <div className="bg-transparent p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-orange-600 mb-4">
              3. Comprovantes de Origem e/ou Capacidade Financeira
            </h2>

            {formData.personType === 'pf' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-100 mb-2">
                  Por favor, forneça pelo menos um dos seguintes documentos:
                </p>

                <FileUploadField
                  id="bankStatement"
                  label="Extrato Bancário"
                  onChange={handleFileChange}
                  error={validationErrors.bankStatement}
                  selectedFile={formData.bankStatement}
                />

                <FileUploadField
                  id="holerite"
                  label="Holerite"
                  onChange={handleFileChange}
                  error={validationErrors.holerite}
                  selectedFile={formData.holerite}
                />

                <FileUploadField
                  id="saleContract"
                  label="Contrato de Compra e Venda"
                  onChange={handleFileChange}
                  error={validationErrors.saleContract}
                  selectedFile={formData.saleContract}
                />

                <FileUploadField
                  id="invoice"
                  label="Nota Fiscal (NF)"
                  onChange={handleFileChange}
                  error={validationErrors.invoice}
                  selectedFile={formData.invoice}
                />

                <FileUploadField
                  id="incomeDeclaration"
                  label="Declaração de Imposto de Renda (IR)"
                  onChange={handleFileChange}
                  error={validationErrors.incomeDeclaration}
                  selectedFile={formData.incomeDeclaration}
                />
              </div>
            )}

            {formData.personType === 'pj' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-100 mb-2">
                  Por favor, forneça pelo menos um dos seguintes documentos:
                </p>

                <FileUploadField
                  id="revenueDeclaration"
                  label="Declaração de Faturamento da Empresa"
                  onChange={handleFileChange}
                  error={validationErrors.revenueDeclaration}
                  selectedFile={formData.revenueDeclaration}
                />

                <FileUploadField
                  id="decore"
                  label="DECORE"
                  onChange={handleFileChange}
                  error={validationErrors.decore}
                  selectedFile={formData.decore}
                />

                <FileUploadField
                  id="balanceSheet"
                  label="Balanço Patrimonial"
                  onChange={handleFileChange}
                  error={validationErrors.balanceSheet}
                  selectedFile={formData.balanceSheet}
                />

                <FileUploadField
                  id="incomeStatement"
                  label="Demonstração de Resultado"
                  onChange={handleFileChange}
                  error={validationErrors.incomeStatement}
                  selectedFile={formData.incomeStatement}
                />

                <FileUploadField
                  id="companyBankStatement"
                  label="Extrato Bancário da Empresa"
                  onChange={handleFileChange}
                  error={validationErrors.companyBankStatement}
                  selectedFile={formData.companyBankStatement}
                />
              </div>
            )}
          </div>

          {formData.personType === 'pj' && (
            <div className="bg-transparent p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-orange-600 mb-4">
                4. Documentos Adicionais (Pessoa Jurídica - CNPJ)
              </h2>

              <div className="space-y-4">
                <FileUploadField
                  id="socialContract"
                  label="Contrato Social"
                  onChange={handleFileChange}
                  error={validationErrors.socialContract}
                  required
                  selectedFile={formData.socialContract}
                />

                <FileUploadField
                  id="contractAmendment"
                  label="Última Alteração do Contrato Social"
                  onChange={handleFileChange}
                  error={validationErrors.contractAmendment}
                  selectedFile={formData.contractAmendment}
                />

                <FileUploadField
                  id="cnpjCard"
                  label="Último Cartão CNPJ Atualizado"
                  onChange={handleFileChange}
                  error={validationErrors.cnpjCard}
                  required
                  selectedFile={formData.cnpjCard}
                />
              </div>
            </div>
          )}

          <div className="bg-transparent p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-orange-600 mb-4">
              Termos e Condições
            </h2>

            <div className="mb-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange}
                    className={`h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded ${
                      validationErrors.termsAccepted ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="termsAccepted"
                    className="font-medium text-gray-100"
                  >
                    Concordo com os{' '}
                    <button
                      type="button"
                      onClick={toggleTerms}
                      className="text-orange-600 underline"
                    >
                      Termos e Condições
                    </button>{' '}
                    e autorizo o processamento dos meus dados conforme a
                    Política de Privacidade.
                  </label>
                  {validationErrors.termsAccepted && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors.termsAccepted}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-lg text-white font-medium ${
                isSubmitting
                  ? 'bg-orange-400 cursor-not-allowed'
                  : 'bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300'
              } transition-colors duration-200`}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Documentos'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 p-4 bg-transparent rounded-lg">
        <h3 className="text-sm font-medium text-gray-100 mb-2">
          Informações de Segurança:
        </h3>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• Todos os dados são transmitidos via conexão segura (HTTPS)</li>
          <li>• Os documentos enviados são armazenados com criptografia</li>
          <li>• Os arquivos são automaticamente excluídos após 7 dias</li>
          <li>• Seus dados são protegidos de acordo com a LGPD</li>
        </ul>
      </div>
      <WhatsAppButton />
      {showTerms && <TermsAndConditions onClose={toggleTerms} />}
    </div>
  );
};

export default KYCForm;
