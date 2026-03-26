import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  customerEmail?: string;
  createdAt: string;
}

interface PaymentsResponse {
  data: Payment[];
  total: number;
  page: number;
  limit: number;
}

interface PaymentsParams extends Record<string, unknown> {
  page?: number;
  limit?: number;
  status?: string;
}

export function usePayments(params: PaymentsParams = {}) {
  return useQuery<PaymentsResponse>({
    queryKey: ["payments", params],
    queryFn: () => api.get("/payments", { params }),
  });
}

export function usePayment(id: string) {
  return useQuery<Payment>({
    queryKey: ["payment", id],
    queryFn: () => api.get(`/payments/${id}`),
    enabled: !!id,
  });
}
