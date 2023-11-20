"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { address } = useAccount();
  const router = useRouter();
  if (!address) {
    router.push("/");
  }

  return <>{children}</>;
}
