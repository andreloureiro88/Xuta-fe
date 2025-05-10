import React, { useState } from "react";

import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletName } from "@solana/wallet-adapter-base";
import WalletModalPicker from "../components/WalletModalPicker";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<WalletName | null>(null);

  return (
    <div className="bg-[var(--deep-navy)] text-white font-sans">
      <header className="bg-[var(--vibrant-purple)]">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
          <a href="#" className="text-2xl font-bold">
            Xuta
          </a>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#clubs"
                className="transition-all transform-origin-center duration-300 ease-in-out hover:text-lg"
              >
                Clubs
              </a>
            </li>
            <li>
              <a
                href="#athletes"
                className="transition-all transform-origin-center duration-300 ease-in-out hover:text-lg"
              >
                Athletes
              </a>
            </li>

            <li>
              <a
                href="#investors"
                className="transition-all transform-origin-center duration-300 ease-in-out hover:text-lg"
              >
                Investors
              </a>
            </li>
            <li>
              <Link
                to="campaigns"
                className="text-[var(--light-green)] transition-all transform-origin-center duration-300 ease-in-out hover:text-lg"
              >
                Campaigns
              </Link>
            </li>
          </ul>
          <WalletModalPicker />
        </nav>
      </header>

      <section id="hero" className="pt-16 pb-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-extrabold mb-4">
            Invest in Tomorrow’s Stars Today
          </h1>
          <p className="text-xl mb-8 text-[var(--soft-lavender)]">
            Xuta lets fans, clubs, and investors buy fractionalized tokens of
            athletes’ future earnings on Solana.
          </p>
          <a
            href="#clubs"
            className="inline-block bg-[var(--vibrant-purple)] hover:bg-[var(--soft-lavender)] 
         text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Learn More
          </a>
        </div>
      </section>

      <section className="flex flex-wrap py-6">
        <div
          id="clubs"
          className="w-full md:w-1/2 box-border flex flex-col items-center gap-8 bg-soft-lavender ease-in-out transition-all hover:skew-x-[-5deg]"
        >
          <div className="px-30 py-6 flex flex-col duration-300">
            <h2 className="text-2xl font-bold mb-2 text-vibrant-purple">
              For Feeder Clubs
            </h2>
            <p className="mb-4 code">
              Tokenize a percentage of future transfer fees to get upfront
              liquidity without losing control.
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4 code">
              <li>Smart-contract tokenization</li>
              <li>Upfront funding</li>
              <li>On-chain legal hashes</li>
            </ul>
            <a
              href="#"
              className="text-light-green font-semibold hover:underline"
            >
              Get Started →
            </a>
          </div>
        </div>

        <div
          id="athletes"
          className="w-full md:w-1/2 box-border flex flex-col items-center gap-8 duration-300 ease-in-out transition-all hover:skew-x-[5deg]"
        >
          <div className="px-30 py-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-2 text-vibrant-purple">
              For Aspiring Athletes
            </h2>
            <p className="mb-4 code">
              Secure training & education capital by issuing tokens on your
              future pro earnings.
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4 code">
              <li>Custom earning schedules</li>
              <li>Transparent dashboard</li>
              <li>NIL & NCAA compliant</li>
            </ul>
            <a
              href="#"
              className="text-light-green font-semibold hover:underline"
            >
              Mint Your Tokens →
            </a>
          </div>
        </div>

        <div
          id="fans"
          className="w-full md:w-1/2 flex flex-col items-center gap-8 ease-in-out duration-300 transition-all hover:skew-x-[5deg]"
        >
          <div className="px-30 py-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-2 text-vibrant-purple">
              For Passionate Fans
            </h2>
            <p className="mb-4 code">
              Back your hometown heroes early and earn rewards when they make it
              big.
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4 code">
              <li>Easy USDC/USDT buy flow</li>
              <li>Exclusive NFT badges</li>
              <li>Milestone notifications</li>
            </ul>
            <a
              href="#"
              className="text-light-green font-semibold hover:underline"
            >
              Explore Tokens →
            </a>
          </div>
        </div>

        <div
          id="investors"
          className="w-full md:w-1/2 flex flex-col items-center gap-8 bg-soft-lavender ease-in-out duration-300 transition-all hover:skew-x-[-5deg]"
        >
          <div className="px-30 py-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-2 text-vibrant-purple">
              For Savvy Investors
            </h2>
            <p className="mb-4 code">
              Trade fractional athlete tokens in a data-driven marketplace to
              maximize ROI.
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4 code">
              <li>Live valuation dashboards</li>
              <li>Player-stat filters</li>
              <li>Secondary market access</li>
            </ul>
            <a
              href="#"
              className="text-light-green font-semibold hover:underline"
            >
              View Dashboard →
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--vibrant-purple)] mt-12">
        <div className="container mx-auto py-6 px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2025 Xuta. Built on Solana.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-[var(--light-green)]">
              Twitter
            </a>
            <a href="#" className="hover:text-[var(--light-green)]">
              Discord
            </a>
            <a href="#" className="hover:text-[var(--light-green)]">
              Telegram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Home;
