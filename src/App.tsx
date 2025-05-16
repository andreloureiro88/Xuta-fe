// src/App.tsx
import React from "react";

import { Route, Routes } from "react-router-dom";
import { Campaigns, Institutions, Home } from "./containers";
import WalletConnect from "./components/WalletConnect";
import { Toaster } from "react-hot-toast";
import { PrimeReactProvider } from "primereact/api";

// PrimeReact CSS imports
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css"; // flex

const App: React.FC = () => {
  return (
    <WalletConnect>
      <Toaster />
      <PrimeReactProvider value={{ ripple: true }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/institutions" element={<Institutions />} />
        </Routes>
      </PrimeReactProvider>
    </WalletConnect>
  );
};

export default App;
