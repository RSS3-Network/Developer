"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useGetAppList } from "@/queries/app";

export default function DashboardNav() {
  const links: {
    href: string;
    onClick?: () => void;
    isActive: (ctx: { href: string; pathname: string | null }) => boolean;
    icon: React.ReactNode;
    text: string;
    lever?: number;
    withList?: boolean;
  }[] = [
    {
      href: `/`,
      isActive: ({ href, pathname }) => href === pathname,
      icon: "icon-[mingcute--home-6-line]",
      text: "Home",
    },
    {
      href: `/app`,
      isActive: ({ href, pathname }) => href === pathname,
      icon: "icon-[mingcute--grid-line]",
      text: "RSS3 Apps",
      withList: true,
    },
    {
      href: `/analytics`,
      isActive: ({ href, pathname }) => href === pathname,
      icon: "icon-[mingcute--chart-pie-line]",
      text: "Analytics",
    },
    {
      href: `/billing`,
      isActive: ({ href, pathname }) => href === pathname,
      icon: "icon-[mingcute--bank-line]",
      text: "Billing",
    },
  ];

  const pathname = usePathname();
  const appList = useGetAppList();

  return (
    <div className="w-sidebar transition-[width] relative flex-shrink-0 pt-6 border-r">
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="space-y-[2px] text-zinc-500 flex-1 min-h-0 overflow-y-auto mx-2">
          {links.map((link) => {
            const active =
              link.href &&
              link.isActive({
                pathname,
                href: link.href,
              });
            return (
              <>
                <Link
                  href={link.href}
                  key={link.text}
                  className={cn(
                    `flex pl-6 pr-4 h-12 items-center space-x-2 w-full transition-colors rounded-lg font-medium`,
                    active
                      ? `bg-blue-200 font-medium text-rss3-blue`
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
                {link.withList &&
                  appList.data?.map((app) => {
                    const href = `/app/${app.id}`;
                    const active = pathname === href;
                    return (
                      <Link
                        href={href}
                        key={app.id}
                        className={cn(
                          `flex pl-6 pr-4 h-10 items-center space-x-2 ml-7 transition-colors rounded-lg text-sm font-medium`,
                          active
                            ? `bg-blue-200 font-medium text-rss3-blue`
                            : link.href || link.onClick
                            ? "hover:bg-slate-200 hover:bg-opacity-50"
                            : "opacity-80 cursor-default",
                        )}
                      >
                        <span className="truncate">{app.name}</span>
                      </Link>
                    );
                  })}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
