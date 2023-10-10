"use client";

import { ConnectKitButton } from "connectkit";

export default function ConnectButton() {
  return (
    <div className="h-10">
      <ConnectKitButton
        customTheme={{
          "--ck-font-family": "var(--font-poppins), Noto Sans, sans-serif",
          "--ck-connectbutton-font-size": "18px",
        }}
      />
    </div>
  );
}
