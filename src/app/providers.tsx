"use client";

import { MantineProvider } from "@mantine/core";
import {
  WALLET_CONNECT_PROJECT_ID,
  TITLE,
  DESCRIPTION,
  ALCHEMY_ID,
} from "@/lib/env";

import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    alchemyId: ALCHEMY_ID,
    walletConnectProjectId: WALLET_CONNECT_PROJECT_ID,

    appName: TITLE,
    appDescription: DESCRIPTION,
    // appUrl: "https://family.co",
    // appIcon: "https://family.co/logo.png",
  }),
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      <WagmiConfig config={config}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </WagmiConfig>
    </MantineProvider>
  );
}
