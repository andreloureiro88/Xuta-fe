// src/App.tsx
import React from "react";

import { Route, Routes } from "react-router-dom";
import { Campaigns, Institutions, Home } from "./containers";
import WalletConnect from "./components/WalletConnect";
import { Toaster } from "react-hot-toast";
const App: React.FC = () => {
  return (
    <WalletConnect>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/institutions" element={<Institutions />} />
      </Routes>
    </WalletConnect>
  );
};

export default App;
