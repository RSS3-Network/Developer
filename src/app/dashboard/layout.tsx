import DashboardNav from "@/components/DashboardNav";
import { StickyNav } from "@/components/sticky-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-blue-50 min-h-full flex flex-col">
      <StickyNav theme="dark" />
      <div className="flex pb-4 px-4 flex-1">
        <DashboardNav />
        <div className="flex-1">
          <div className="flex-1 min-w-0 bg-white w-full h-full rounded-xl drop-shadow overflow-y-auto p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
