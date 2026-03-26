import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface Merchant {
  id: string;
  name: string;
  email: string;
  logo?: string;
  settings: Record<string, unknown>;
}

export function useMerchant() {
  return useQuery<Merchant>({
    queryKey: ["merchant"],
    queryFn: () => api.get("/merchant/me"),
  });
}
