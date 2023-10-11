import DashboardNav from "@/components/DashboardNav";
import { StickyNav } from "@/components/sticky-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-blue-50 min-h-full pt-20 py-6 px-4">
      <StickyNav theme="dark" />
      <DashboardNav />
      <div className="p-3 w-full h-full">
        <div className="flex-1 min-w-0 bg-white w-full h-full rounded-xl drop-shadow overflow-y-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
