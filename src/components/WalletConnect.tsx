import React, { useCallback, useMemo, useState } from "react";
import {
  ConnectionProvider,
  useWallet,
  Wallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import {
  BitpieWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  LedgerWalletAdapter,
  MathWalletAdapter,
  PhantomWalletAdapter,
  SafePalWalletAdapter,
  SolflareWalletAdapter,
  SolongWalletAdapter,
  TokenPocketWalletAdapter,
  TorusWalletAdapter,
  SkyWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import AnimatedButton from "./AnimatedButton";
import WalletModalPicker from "./WalletModalPicker";

const WalletConnect: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedWallet, setSelectedWallet] = useState<WalletName | null>(null);
  const network = "devnet";
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new MathWalletAdapter(),
      new Coin98WalletAdapter(),
      new CloverWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new SafePalWalletAdapter(),
      new BitpieWalletAdapter(),
      new SolongWalletAdapter(),
      new TokenPocketWalletAdapter(),
      new SkyWalletAdapter(),
    ],
    []
  );

  const handleDisconnect = async () => {
    const { wallet, disconnect } = useWallet();
    await disconnect().then(() => {
      setSelectedWallet(null);
    });
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {selectedWallet && (
          <AnimatedButton
            text="Disconnect"
            trigger={() => handleDisconnect()}
          />
        )}
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletConnect;
