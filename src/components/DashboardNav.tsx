"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const links: {
    href: string;
    onClick?: () => void;
    isActive: (ctx: { href: string; pathname: string | null }) => boolean;
    icon: React.ReactNode;
    text: string;
    lever?: number;
  }[] = [
    {
      href: `/dashboard`,
      isActive: ({ href, pathname }) => href === pathname,
      icon: "icon-[mingcute--grid-line]",
      text: "RSS3 Apps",
    },
    {
      href: `/dashboard/analytics`,
      isActive: ({ href, pathname }) => href === pathname,
      icon: "icon-[mingcute--chart-pie-line]",
      text: "Analytics & Logs",
    },
    {
      href: `/dashboard/finance`,
      isActive: ({ href, pathname }) => href === pathname,
      icon: "icon-[mingcute--bank-line]",
      text: "Finance",
    },
  ];

  const pathname = usePathname();

  return (
    <div className={`w-sidebar transition-[width] relative flex-shrink-0`}>
      <div
        className={`w-sidebar transition-[width] fixed h-full flex flex-col`}
      >
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="px-3 space-y-[2px] text-zinc-500 flex-1 min-h-0 overflow-y-auto">
            {links.map((link) => {
              const active =
                link.href &&
                link.isActive({
                  pathname,
                  href: link.href,
                });
              return (
                <Link
                  href={link.href}
                  key={link.text}
                  className={cn(
                    `flex px-4 h-12 items-center rounded-xl space-x-2 w-full transition-colors`,
                    active
                      ? `bg-white font-medium text-accent drop-shadow-sm`
                      : link.href || link.onClick
                      ? "hover:bg-slate-200 hover:bg-opacity-50"
                      : "opacity-80 cursor-default",
                  )}
                  onClick={link.onClick}
                >
                  <i
                    className={cn(link.icon, "text-xl")}
                    style={{
                      marginLeft: link.lever ? (link.lever - 1) * 20 : 0,
                    }}
                  ></i>
                  <span className="truncate">{link.text}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
