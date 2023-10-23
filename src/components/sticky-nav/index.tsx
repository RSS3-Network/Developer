"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";

import { nav, Section } from "./nav";
import styles from "./index.module.css";
import Logo from "@/components/icons/Logo";
import ConnectButton from "@/components/ConnectButton";

type Item = {
  title: string;
  section?: Section;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const items: Item[] = [
  { title: "Network", href: nav.network.url },
  { title: "Ecosystem", href: nav.ecosystem.url },
  { title: "Docs", href: nav.developerDoc.url, target: "_blank" },
  { title: "Blogs", href: "https://rss3.io/blog" },
];

const products = [
  { title: "Social", url: "https://rss3.io/social" },
  { title: "Search", url: "https://rss3.io/search" },
  { title: "AI", url: "https://rss3.io/ai" },
];

export type StartBuildingBtnTheme = "blue-dark" | "white";

export function StickyNav({
  theme,
  hideConnectButton,
}: {
  theme: "light" | "dark";
  hideConnectButton?: boolean;
}) {
  return (
    <div className="z-20 py-5 border-b">
      <div className="mx-auto box-content flex items-center px-10">
        <Link
          href="/"
          className={clsx(
            "mr-11 flex",
            theme === "light" ? "text-white" : "text-black",
          )}
        >
          <Logo />
          <span className="ml-2">Deverloper</span>
        </Link>

        <nav className={theme === "light" ? "text-white" : "text-black"}>
          <ul className="flex h-10 items-center justify-center gap-7">
            {items.map(({ title, ...props }, index) => {
              return (
                <li key={title} style={{ order: index * 2 }}>
                  <a
                    {...props}
                    className={clsx(
                      "flex items-center gap-2 p-1.5 hover:underline",
                    )}
                  >
                    <div className="text-sm font-normal uppercase tracking-wide transition">
                      {title}
                    </div>
                  </a>
                </li>
              );
            })}

            <li
              className={clsx(
                "relative order-1 flex cursor-pointer items-center gap-2 p-1.5",
                styles.community,
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="9"
                viewBox="0 0 8 9"
                fill="none"
                className="h-3 w-3"
              >
                <path
                  d="M1.27344 4.95135L4.04537 7.72336L6.81738 4.95135"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  strokeLinecap="square"
                />
                <path
                  d="M1.27344 1.29822L4.04537 4.07023L6.81738 1.29822"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  strokeLinecap="square"
                />
              </svg>
              <div className="text-sm font-normal uppercase tracking-wide transition">
                Products
              </div>

              <div
                className={clsx(
                  "absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-full pt-3",
                  styles.communityPopup,
                )}
              >
                <ul
                  className={clsx(
                    "flex-col items-start rounded-lg border bg-white py-2.5 text-left",
                  )}
                >
                  {products.map(({ title, url }) => (
                    <li key={title}>
                      <a
                        href={url}
                        target={url.startsWith("https://") ? "_blank" : "_self"}
                        className="flex min-w-[90px] whitespace-nowrap px-2.5 py-1.5 text-xs font-normal uppercase tracking-widest text-black opacity-70 transition hover:underline hover:opacity-100"
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </nav>
        {!hideConnectButton && (
          <div className="ml-auto">
            <ConnectButton />
          </div>
        )}
      </div>
    </div>
  );
}
