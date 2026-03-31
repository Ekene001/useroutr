import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { MerchantProfile } from "./useSettings";

export function useMerchant() {
  return useQuery<MerchantProfile>({
    queryKey: ["merchant-profile"],
    queryFn: () => api.get("/merchants/me"),
  });
}
