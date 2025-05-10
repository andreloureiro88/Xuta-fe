// src/App.tsx
import React from "react";

import Home from "./containers/Home";
import { Route, Routes } from "react-router-dom";
import { Campaigns } from "./containers/Campaigns";
import WalletConnect from "./components/WalletConnect";

const App: React.FC = () => {
  return (
    <WalletConnect>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns" element={<Campaigns />} />
      </Routes>
    </WalletConnect>
  );
};

export default App;
