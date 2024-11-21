
"use client";
import WalletProvider from "@/components/wallet-provider";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Contracts } from "@/components/contracts";

export default function Home() {
  return (
    <WalletProvider>
      <div className="absolute top-10 right-10">
        <ConnectButton />
      </div>

      <div className="flex justify-center items-center h-screen">
        <Contracts/>
      </div>
      
    </WalletProvider>

  ) 
};

