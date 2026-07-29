import { z } from 'zod';

export const createQuotationSchema = z.object({
  projectId: z.string().optional(),
  clientId: z.string().min(1, 'Client ID is required'),
  subtotal: z.number().positive(),
  taxRate: z.number().default(18),
  discountAmount: z.number().default(0),
  termsAndConditions: z.string().optional(),
});

export const createInvoiceSchema = z.object({
  projectId: z.string().optional(),
  clientId: z.string().min(1, 'Client ID is required'),
  quotationId: z.string().optional(),
  subtotal: z.number().positive(),
  dueDate: z.string(),
});

export const recordPaymentSchema = z.object({
  invoiceId: z.string().min(1, 'Invoice ID is required'),
  amount: z.number().positive(),
  paymentMethod: z.enum(['razorpay', 'bank_transfer', 'cash', 'stripe']),
  transactionReference: z.string().optional(),
});

export const createExpenseSchema = z.object({
  category: z.string().min(1, 'Expense category is required'),
  amount: z.number().positive(),
  vendorName: z.string().min(1, 'Vendor name is required'),
  expenseDate: z.string(),
  projectId: z.string().optional(),
});
