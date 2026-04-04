import { z } from 'zod';

export const SendInvoiceSchema = z.object({
  message: z.string().max(1000).optional(),
});

export type SendInvoiceDto = z.infer<typeof SendInvoiceSchema>;
