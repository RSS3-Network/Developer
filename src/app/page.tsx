"use client";

import { DESCRIPTION } from "@/lib/env";
import ConnectButton from "@/components/ConnectButton";
import { FirstScreenBg } from "@/components/first-screen";

export default function DashboardIndex() {
  return (
    <div className="flex flex-col items-center justify-center border-b h-full relative overflow-hidden">
      <FirstScreenBg />
      <div className="flex flex-col items-center justify-center space-y-10">
        <h1 className="text-6xl font-light text-center space-y-8 px-8">
          {DESCRIPTION}
        </h1>
        <ConnectButton
          customText="BUILD WITH RSS3 →"
          className="rounded-[5px] border transition-colors"
        />
      </div>
    </div>
  );
}
