"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  interval?: number;
}

export default function AutoRefresh({ interval = 60 }: Props) {
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      router.refresh();
    }, interval * 1000);

    return () => clearInterval(intervalId);
  }, [router, interval]);

  return null;
}
