"use client";

import { ConnectKitButton } from "connectkit";
import { Button } from "@tremor/react";
import { cn } from "@/lib/utils";

export default function ConnectButton({
  className,
  customText,
}: {
  className?: string;
  customText?: string;
}) {
  return (
    <div className="h-11">
      <ConnectKitButton.Custom>
        {({ isConnected, show, truncatedAddress, ensName }) => {
          return (
            <Button
              onClick={show}
              className={cn("[&>span]:!text-base", className)}
              size="xl"
            >
              {isConnected
                ? ensName || truncatedAddress
                : customText || "Connect Wallet"}
            </Button>
          );
        }}
      </ConnectKitButton.Custom>
    </div>
  );
}
