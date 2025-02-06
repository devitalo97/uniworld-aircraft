"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useUpdateUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateUrl = (params: Record<string, any>, replace = false) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, v)); 
        } else if (value === null) {
            currentParams.delete(key); 
        } else {
            currentParams.set(key, value); 
        }
    });

    const newUrl = `${pathname}?${currentParams.toString()}`;

    if (replace) {
      router.replace(newUrl); // Altera a URL sem adicionar histórico (substitui)
    } else {
      router.push(newUrl); // Adiciona ao histórico do navegador
    }
  };

  return updateUrl;
}
