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
import { siweClient } from "@/lib/siweClient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet, sepolia } from "wagmi/chains";

const config = createConfig(
  getDefaultConfig({
    alchemyId: ALCHEMY_ID,
    walletConnectProjectId: WALLET_CONNECT_PROJECT_ID,

    appName: TITLE,
    appDescription: DESCRIPTION,
    // appUrl: "https://family.co",
    // appIcon: "https://family.co/logo.png",

    // TODO chains: [mainnet],
    chains: [sepolia],
  }),
);

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      <WagmiConfig config={config}>
        <siweClient.Provider
          signOutOnAccountChange={false}
          signOutOnNetworkChange={false}
        >
          <ConnectKitProvider>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </ConnectKitProvider>
        </siweClient.Provider>
      </WagmiConfig>
    </MantineProvider>
  );
}
