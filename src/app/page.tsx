import ConnectButton from "@/components/ConnectButton";
import { FirstScreenBg } from "@/components/first-screen";
import { DESCRIPTION } from "@/lib/env";

export default function Home() {
  return (
    <div className="h-full flex items-center justify-center flex-col space-y-8">
      <FirstScreenBg />
      <h1 className="text-8xl font-light text-center space-y-8 px-8">
        {DESCRIPTION}
      </h1>
      <ConnectButton />
    </div>
  );
}
