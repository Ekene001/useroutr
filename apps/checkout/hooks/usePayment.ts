import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  merchantName: string;
  merchantLogo?: string;
  description?: string;
  lineItems?: { label: string; amount: number }[];
  expiresAt?: string;
}

export function usePayment(paymentId: string) {
  return useQuery<Payment>({
    queryKey: ["payment", paymentId],
    queryFn: () => api.get(`/checkout/${paymentId}`),
    enabled: !!paymentId,
    refetchInterval: 5000,
  });
}
