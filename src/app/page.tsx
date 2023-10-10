import ConnectButton from "@/components/ConnectButton";
import { FirstScreenBg } from "@/components/first-screen";
import { TITLE, DESCRIPTION } from "@/lib/env";

export default function Home() {
  return (
    <div className="h-full flex items-center justify-center flex-col space-y-4">
      <FirstScreenBg />
      <h1 className="font-bold text-6xl">{TITLE}</h1>
      <h2 className="font-medium text-3xl">{DESCRIPTION}</h2>
      <ConnectButton />
    </div>
  );
}
