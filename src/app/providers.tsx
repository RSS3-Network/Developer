"use client";

import { MantineProvider } from "@mantine/core";
import {
  WALLET_CONNECT_PROJECT_ID,
  TITLE,
  DESCRIPTION,
  ALCHEMY_ID,
} from "@/lib/env";

import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig, SIWESession } from "connectkit";
import { siweClient } from "@/lib/siweClient";

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
        <siweClient.Provider
          onSignIn={(session?: SIWESession) => console.log("onSignIn", session)}
          onSignOut={() => console.log("onSignOut")}
        >
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </siweClient.Provider>
      </WagmiConfig>
    </MantineProvider>
  );
}
