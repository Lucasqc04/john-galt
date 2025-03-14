import { z } from 'zod';

export enum PersonType {
  PF = 'pf',
  PJ = 'pj',
}

export enum IdentificationType {
  CNH = 'CNH',
  RG = 'RG',
}

export interface KYC {
  cpf: string;
  name: string;
  personType: PersonType;
  identificationType: IdentificationType;
  identificationFile: File;
  termsAccepted: boolean;
  investmentAmount?: number;
  contactNumber?: string;

  // PF documents
  bankStatement?: File;
  holerite?: File;
  saleContract?: File;
  invoice?: File;
  incomeDeclaration?: File;

  // PJ documents
  revenueDeclaration?: File;
  decore?: File;
  balanceSheet?: File;
  incomeStatement?: File;
  companyBankStatement?: File;
  socialContract?: File;
  contractAmendment?: File;
  cnpjCard?: File;
}

export const kycSchema = z.object({
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  name: z.string().min(3, 'Nome muito curto'),
  personType: z.nativeEnum(PersonType),
  identificationType: z.nativeEnum(IdentificationType),
  identificationFile: z.instanceof(File, {
    message: 'Arquivo de identificação é obrigatório',
  }),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, 'Termos devem ser aceitos'),

  investmentAmount: z
    .number()
    .min(0, 'O valor do investimento não pode ser negativo')
    .optional(),

  contactNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Número de contato inválido')
    .optional(),

  // PF documents
  bankStatement: z.instanceof(File).optional(),
  holerite: z.instanceof(File).optional(),
  saleContract: z.instanceof(File).optional(),
  invoice: z.instanceof(File).optional(),
  incomeDeclaration: z.instanceof(File).optional(),

  // PJ documents
  revenueDeclaration: z.instanceof(File).optional(),
  decore: z.instanceof(File).optional(),
  balanceSheet: z.instanceof(File).optional(),
  incomeStatement: z.instanceof(File).optional(),
  companyBankStatement: z.instanceof(File).optional(),
  socialContract: z.instanceof(File).optional(),
  contractAmendment: z.instanceof(File).optional(),
  cnpjCard: z.instanceof(File).optional(),
});
