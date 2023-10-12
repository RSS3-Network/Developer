import ConnectButton from "@/components/ConnectButton";
import { FirstScreenBg } from "@/components/first-screen";
import { DESCRIPTION } from "@/lib/env";
import { StickyNav } from "@/components/sticky-nav";

export default function Home() {
  return (
    <div className="h-full bg-rss3-blue text-white flex flex-col">
      <StickyNav theme="light" hideConnectButton={true} />
      <div className="flex-1 -mt-20 flex items-center justify-center flex-col space-y-8">
        <FirstScreenBg />
        <h1 className="text-8xl font-light text-center space-y-8 px-8">
          {DESCRIPTION}
        </h1>
        <ConnectButton
          customText="BUILD WITH RSS3 →"
          className="rounded-[5px] bg-white text-rss3-blue border !border-white hover:bg-rss3-blue hover:text-white transition-colors"
        />
      </div>
    </div>
  );
}
