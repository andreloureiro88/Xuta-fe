import React, { useState } from "react";

import "@solana/wallet-adapter-react-ui/styles.css";
import WalletModalPicker from "../components/WalletModalPicker";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

export const Home: React.FC = () => {
  return (
    <div className="bg-[var(--deep-navy)] text-white">
      <header className="bg-[var(--vibrant-purple)]">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
          <div>
            <img
              src="/src/images/xuta.jpeg"
              alt="Xuta"
              className="w-[100px] h-[100px] rounded-full"
            />
          </div>

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
              <Link
                to="institutions"
                className="text-[var(--light-green)] transition-all transform-origin-center duration-300 ease-in-out hover:text-lg"
              >
                Institutions
              </Link>
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

      <section id="hero" className="pt-16 pb-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center  gap-8">
          {/* Left: Info */}
          <div className="flex-1 flex justify-center md:justify-start">
            <div className="rounded-3xl bg-white/10 backdrop-blur-md shadow-2xl p-10  flex flex-col items-center md:items-start">
              <h1 className="text-5xl font-extrabold mb-4 font-crypto bg-gradient-to-r from-light-green via-vibrant-purple to-soft-lavender bg-clip-text text-transparent animate-gradient-move ">
                Invest in Tomorrow's Stars{" "}
                <span className="text-light-green glow-crypto neon-crypto">
                  Today
                </span>
              </h1>
              <p className="text-xl mb-2 text-[var(--soft-lavender)] font-crypto">
                Xuta lets fans, clubs, and investors buy fractionalized tokens
                of athletes' future earnings on Solana.
              </p>
            </div>
          </div>
          {/* Right: Football Player Silhouette */}
          <div className="flex justify-center md:justify-end mt-8 md:mt-0">
            <svg
              fill="var(--light-green)"
              height="200px"
              width="200px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 290 290"
              xmlSpace="preserve"
              className="neon-crypto"
            >
              <path
                colorRendering="auto"
                imageRendering="auto"
                shapeRendering="auto"
                colorInterpolation="sRGB"
                d="M45,0
	c-2.761,0-5,2.239-5,5v280c0,2.761,2.239,5,5,5h200c2.761,0,5-2.239,5-5V5c0-2.761-2.239-5-5-5L45,0L45,0z M50,10h50v15
	c0,2.761,2.239,5,5,5h80c2.761,0,5-2.239,5-5V10h50v129.963h-50.285c-2.5-22.452-21.612-40-44.715-40
	c-23.103,0-42.213,17.548-44.713,40H50V10z M110,10h70v10h-70V10z M145,109.963c17.69,0,32.229,12.997,34.643,30h-69.283
	C112.773,122.96,127.31,109.963,145,109.963z M50,149.963h50.287c2.5,22.453,21.61,40,44.713,40s42.215-17.547,44.715-40H240V280
	h-50v-15c0-2.761-2.239-5-5-5h-80c-2.761,0-5,2.239-5,5v15H50V149.963L50,149.963z M110.359,149.963h69.283
	c-2.413,17.003-16.952,30-34.643,30C127.31,179.963,112.773,166.966,110.359,149.963z M110,270h70v10h-70C110,280,110,270,110,270z"
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[var(--deep-navy)] to-[var(--vibrant-purple)]">
        <div className="container mx-auto px-2 flex flex-col gap-8">
          {/* Clubs */}
          <div className="relative w-full max-w-7xl mx-auto rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 p-8 flex flex-col md:flex-row items-center group overflow-hidden skew-y-[-2deg]">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8 order-2 md:order-1">
              <i className="pi pi-building text-vibrant-purple text-6xl opacity-80" />
            </div>
            <div className="flex-1 order-1 md:order-2">
              <h2 className="text-2xl font-bold mb-2 text-light-green flex items-center gap-2 neon-crypto">
                For Feeder Clubs
              </h2>
              <p className="mb-4 text-base text-white/90">
                Tokenize a percentage of future transfer fees to get upfront
                liquidity without losing control.
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4 text-white/80">
                <li>Smart-contract tokenization</li>
                <li>Upfront funding</li>
                <li>On-chain legal hashes</li>
              </ul>
              <Button
                label="Get Started →"
                className="p-button-outlined p-button-lg border-light-green text-light-green hover:bg-light-green hover:text-deep-navy"
              />
            </div>
          </div>
          {/* Athletes */}
          <div className="relative w-full max-w-7xl mx-auto rounded-2xl bg-gradient-to-r from-vibrant-purple/30 to-soft-lavender/20 backdrop-blur-md shadow-2xl border border-white/20 p-8 flex flex-col md:flex-row items-center group overflow-hidden skew-y-[2deg]">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8 order-1">
              <i className="pi pi-star text-vibrant-purple text-6xl opacity-80" />
            </div>
            <div className="flex-1 order-2">
              <h2 className="text-2xl font-bold mb-2 text-light-green flex items-center gap-2 neon-crypto">
                For Aspiring Athletes
              </h2>
              <p className="mb-4 text-base text-white/90">
                Secure training & education capital by issuing tokens on your
                future pro earnings.
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4 text-white/80">
                <li>Custom earning schedules</li>
                <li>Transparent dashboard</li>
                <li>NIL & NCAA compliant</li>
              </ul>
              <Button
                label="Mint Your Tokens →"
                className="p-button-outlined p-button-lg border-light-green text-light-green hover:bg-light-green hover:text-deep-navy"
              />
            </div>
          </div>
          {/* Fans */}
          <div className="relative w-full max-w-7xl mx-auto rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 p-8 flex flex-col md:flex-row items-center group overflow-hidden skew-y-[-2deg]">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8 order-2 md:order-1">
              <i className="pi pi-users text-vibrant-purple text-6xl opacity-80" />
            </div>
            <div className="flex-1 order-1 md:order-2">
              <h2 className="text-2xl font-bold mb-2 text-light-green flex items-center gap-2 neon-crypto">
                For Passionate Fans
              </h2>
              <p className="mb-4 text-base text-white/90">
                Back your hometown heroes early and earn rewards when they make
                it big.
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4 text-white/80">
                <li>Easy USDC/USDT buy flow</li>
                <li>Exclusive NFT badges</li>
                <li>Milestone notifications</li>
              </ul>
              <Button
                label="Explore Tokens →"
                className="p-button-outlined p-button-lg border-light-green text-light-green hover:bg-light-green hover:text-deep-navy"
              />
            </div>
          </div>
          {/* Investors */}
          <div className="relative w-full max-w-7xl mx-auto rounded-2xl bg-gradient-to-r from-vibrant-purple/30 to-soft-lavender/20 backdrop-blur-md shadow-2xl border border-white/20 p-8 flex flex-col md:flex-row items-center group overflow-hidden skew-y-[2deg]">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8 order-1">
              <i className="pi pi-chart-line text-vibrant-purple text-6xl opacity-80" />
            </div>
            <div className="flex-1 order-2">
              <h2 className="text-2xl font-bold mb-2 text-light-green flex items-center gap-2 neon-crypto">
                For Savvy Investors
              </h2>
              <p className="mb-4 text-base text-white/90">
                Trade fractional athlete tokens in a data-driven marketplace to
                maximize ROI.
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4 text-white/80">
                <li>Live valuation dashboards</li>
                <li>Player-stat filters</li>
                <li>Secondary market access</li>
              </ul>
              <Button
                label="View Dashboard →"
                className="p-button-outlined p-button-lg border-light-green text-light-green hover:bg-light-green hover:text-deep-navy"
              />
            </div>
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
