import { WalletName } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import AnimatedButton from "./AnimatedButton";

const WalletModalPicker: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    wallets,
    wallet,
    publicKey,
    connected,
    connecting,
    disconnecting,
    select,
    connect,
    disconnect,
  } = useWallet();

  const handleSelectWallet = async (walletName: WalletName) => {
    try {
      select(walletName);

      await connect()?.then(() => {
        setIsOpen(false);
      });
    } catch (error) {
      console.log(error);
      console.error("Error connecting to wallet:", error);
    }
  };

  const handleDisconnect = async () => {
    await disconnect().then(() => {
      setIsOpen(false);
    });
  };

  return (
    <div className="">
      {connected && (
        <div className="flex items-center gap-2 p-2 border-2 border-soft-lavender rounded-lg group relative">
          <img
            src={wallet?.adapter.icon}
            alt={wallet?.adapter.name}
            className="w-8 h-8"
          />
          <p className="text-white">
            {publicKey?.toBase58().slice(0, 4)}...
            {publicKey?.toBase58().slice(-4)}
          </p>
          <button
            onClick={handleDisconnect}
            className="ml-2 w-6 h-6 text-soft-lavender hover:text-white transition-colors"
            title="Disconnect wallet"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      )}
      {!connected && (
        <AnimatedButton
          text="Connect Wallet"
          trigger={() => {
            if (!isOpen) {
              setIsOpen(true);
            }
          }}
        />
      )}
      {isOpen && !connected && (
        <div className="flex justify-center items-center fixed inset-0 bg-black/50  backdrop-blur-sm z-40 transition-all duration-500 ease-in-out animate-fadeIn">
          <div
            className="bg-deep-navy min-w-md text-pinterest border-soft-lavender border-4 rounded-lg shadow-white p-6 z-50 relative opacity-0 transform translate-y-4 transition-all duration-500 ease-in-out"
            ref={(ref) => {
              // Create a ref to detect clicks outside the component
              if (ref) {
                // Apply fade-in animation when component mounts
                setTimeout(() => {
                  if (ref) {
                    ref.classList.remove("opacity-0", "translate-y-4");
                    ref.classList.add("opacity-100", "translate-y-0");
                  }
                }, 50);

                const handleClickOutside = (event: MouseEvent) => {
                  if (ref && !ref.contains(event.target as Node)) {
                    // Add fade out animation before closing
                    if (ref) {
                      ref.classList.remove("opacity-100", "translate-y-0");
                      ref.classList.add("opacity-0", "translate-y-4");
                      // Wait for animation to complete before closing
                      setTimeout(() => {
                        document.removeEventListener(
                          "mousedown",
                          handleClickOutside
                        );
                        setIsOpen(false);
                      }, 300);
                    }
                  }
                };

                document.addEventListener("mousedown", handleClickOutside);
              }
            }}
          >
            <div>
              <ul className="flex flex-col gap-2">
                {wallets.map((wallet) => (
                  <li key={wallet.adapter.name}>
                    <button
                      className="relative flex items-center gap-4 p-1 rounded-md overflow-hidden transition-all  group w-full"
                      onClick={() => handleSelectWallet(wallet?.adapter?.name)}
                      disabled={connecting}
                    >
                      <span className="absolute top-0 left-0 w-0 h-full bg-soft-lavender transition-all duration-300 ease-out group-hover:w-full -z-10"></span>
                      <img
                        className="transition-transform duration-300 group-hover:scale-110"
                        src={wallet.adapter.icon}
                        alt={wallet.adapter.name}
                        width={32}
                        height={32}
                      />
                      <span className="text-soft-lavender flex flex-1 text-lg transition-all duration-300 group-hover:!text-white group-hover:text-xl group-hover:translate-x-2 group-hover:font-bold">
                        {wallet.adapter.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletModalPicker;
