"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { MantineProvider } from "@mantine/core";
import { WALLET_CONNECT_PROJECT_ID, TITLE, DESCRIPTION } from "@/lib/env";

const projectId = WALLET_CONNECT_PROJECT_ID;

const metadata = {
  name: TITLE,
  description: DESCRIPTION,
  // url: 'https://web3modal.com',
  // icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: "dark",
  themeVariables: {
    // '--w3m-color-mix': '#fff',
    // '--w3m-color-mix-strength': 100
    "--w3m-accent": "#fff",
    "--w3m-font-family": "var(--font-poppins), 'Noto Sans', 'sans-serif'",
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
    </MantineProvider>
  );
}
