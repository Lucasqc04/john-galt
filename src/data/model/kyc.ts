import { z } from 'zod';

// Zod schema for form validation
export const kycFormSchema = z.object({
  // CPF and name
  cpf: z
    .string()
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      'CPF inválido. Use o formato: 000.000.000-00',
    ),
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),

  // Person type and identification
  personType: z.enum(['pf', 'pj'], {
    required_error: 'Tipo de pessoa é obrigatório',
  }),
  identificationType: z.enum(['CNH', 'RG'], {
    required_error: 'Tipo de documento é obrigatório',
  }),

  // Terms acceptance
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'Você precisa aceitar os termos para continuar',
  }),

  // Files are validated separately since they're not simple string values
  identificationFile: z
    .any()
    .refine(
      (file) => file instanceof File || file === null,
      'Arquivo de identificação inválido',
    ),

  // Financial documents for PF
  bankStatement: z
    .any()
    .refine(
      (file) => file instanceof File || file === null,
      'Arquivo de extrato bancário inválido',
    )
    .optional(),
  holerite: z
    .any()
    .refine(
      (file) => file instanceof File || file === null,
      'Arquivo de holerite inválido',
    )
    .optional(),
  saleContract: z
    .any()
    .refine(
      (file) => file instanceof File || file === null,
      'Arquivo de contrato de compra e venda inválido',
    )
    .optional(),
  invoice: z
    .any()
    .refine(
      (file) => file instanceof File || file === null,
      'Arquivo de nota fiscal inválido',
    )
    .optional(),
  incomeDeclaration: z
    .any()
    .refine(
      (file) => file instanceof File || file === null,
      'Arquivo de declaração de imposto de renda inválido',
    )
    .optional(),

  // Financial documents for PJ
  revenueDeclaration: z
    .any()
    .refine(
      (file) => file instanceof File || file === null,
      'Arquivo de declaração de faturamento inválido',
    )
    .optional(),
  decore: z
    .any()
    .refine(
      (file) => file instanceof File || file === null,
      'Arquivo de DECORE inválido',
    )
    .optional(),
  balanceSheet: z
    .any()
    .refine(
      (file) => file instanceof File || file === null,
      'Arquivo de balanço patrimonial inválido',
    )
    .optional(),
  incomeStatement: z
    .any()
    .refine(
      (file) => file instanceof File || file === null,
      'Arquivo de demonstração de resultado inválido',
    )
    .optional(),
  companyBankStatement: z
    .any()
    .refine(
      (file) => file instanceof File || file === null,
      'Arquivo de extrato bancário da empresa inválido',
    )
    .optional(),

  // Additional PJ documents
  socialContract: z
    .any()
    .refine(
      (file) => file instanceof File || file === null,
      'Arquivo de contrato social inválido',
    )
    .optional(),
  contractAmendment: z
    .any()
    .refine(
      (file) => file instanceof File || file === null,
      'Arquivo de alteração de contrato social inválido',
    )
    .optional(),
  cnpjCard: z
    .any()
    .refine(
      (file) => file instanceof File || file === null,
      'Arquivo de cartão CNPJ inválido',
    )
    .optional(),
});

// Type inference from the Zod schema
export type KYCFormData = z.infer<typeof kycFormSchema>;

// Default values for the form
export const defaultKYCFormData: KYCFormData = {
  cpf: '',
  name: '',
  personType: 'pf',
  identificationType: 'CNH',
  termsAccepted: false,
  identificationFile: null,
  bankStatement: null,
  holerite: null,
  saleContract: null,
  invoice: null,
  incomeDeclaration: null,
  revenueDeclaration: null,
  decore: null,
  balanceSheet: null,
  incomeStatement: null,
  companyBankStatement: null,
  socialContract: null,
  contractAmendment: null,
  cnpjCard: null,
};
