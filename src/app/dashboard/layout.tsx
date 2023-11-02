"use client";

import DashboardNav from "@/components/DashboardNav";
import { StickyNav } from "@/components/sticky-nav";
import { useSIWE } from "connectkit";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = useSIWE();
  const router = useRouter();
  if (!isSignedIn) {
    router.push("/");
  }

  return (
    <div className="bg-blue-50 min-h-full flex flex-col">
      <Toaster />
      <StickyNav theme="dark" />
      <div className="flex flex-1">
        <DashboardNav />
        <div className="flex-1 min-w-0">
          <div className="flex-1 min-w-0 bg-white w-full h-full overflow-y-auto p-8 relative">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
