import React, { useEffect, useState } from "react";
import { AnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Connection } from "@solana/web3.js";
import { XutaService } from "../services/XutaService";
import WalletModalPicker from "../components/WalletModalPicker";
import AnimatedButton from "../components/AnimatedButton";
import UploadService from "../services/UploadService";
import { AnchorProvider } from "@coral-xyz/anchor";
export const Campaigns: React.FC = () => {
  const wallet = useWallet();
  const [service, setService] = useState<XutaService | null>(null);
  const [uploadService, setUploadService] = useState<UploadService | null>(
    null
  );
  const [campaigns, setCampaigns] = useState<
    { publicKey: PublicKey; account: any }[]
  >([]);
  const [fileID, setFileID] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Initialize service once wallet is ready
  useEffect(() => {
    if (wallet.publicKey && wallet.signTransaction) {
      // later replace with user connection
      const connection = new Connection("http://localhost:8899", "confirmed");

      const provider = new AnchorProvider(connection, wallet as AnchorWallet, {
        commitment: "confirmed",
      });

      const xutaService = new XutaService(provider);
      console.log("xutaService", xutaService);
      setService(xutaService);

      setUploadService(new UploadService());
    }
  }, [wallet]);

  // Fetch all campaigns
  const loadCampaigns = async () => {
    console.log("Loading campaigns...");
    if (!service) return;
    const all = await service.getAllCampaigns();
    console.log(all);
    const institutions = await service.getInstituttions();
    console.log("ins", institutions);

    setCampaigns(all);
  };

  useEffect(() => {
    if (service) loadCampaigns();
  }, [service]);

  const handleCreateCampaign = async () => {
    if (!service || !newName) return;
    setStatusMsg("Creating campaign...");
    await service.createCampaign(
      newName,
      "contract2", // creator
      "image", // authority
      0.5, // ratio
      1, // targetAmount
      1715611200, // initialDate
      1715611200, // dueDate
      "institution"
    );
    setStatusMsg("Campaign created!");
    await loadCampaigns();
  };

  const handleInitInstitution = async () => {
    if (!service) return;
    setStatusMsg("Initializing institution...");
    await service.initInstitution(
      "institution2233",
      "contrac2444t",
      new PublicKey("G98ibAo8eHdsKN8Bw43Gw8f1fvvYf8gN75AuohvaNf2A")
    );
    setStatusMsg("Institution initialized!");
    await loadCampaigns();
  };

  const handleStart = async () => {
    if (!service || !newName) return;
    setStatusMsg("Starting campaign...");
    await service.startCampaign(newName);
    setStatusMsg("Campaign started!");
    await loadCampaigns();
  };

  const handleBuy = async () => {
    if (!service) return;
  };

  const handleClaim = async () => {};

  const handlePause = async (pk: PublicKey) => {
    if (!service) return;
  };

  const handleFinish = async (pk: PublicKey) => {
    if (!service) return;
  };

  const handleDisableInst = async () => {
    if (!service) return;
  };

  const handleSetAuth = async () => {
    if (!service) return;
  };

  const handleSetFee = async () => {
    if (!service) return;
  };

  const handleSubmitContract = async () => {
    if (!service) return;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!uploadService || !selectedFile) return;
    setStatusMsg("Uploading image...");
    const res = await uploadService.uploadFile(selectedFile, "campaign");
    setFileID(res.fileId);
    setStatusMsg("Image uploaded!");
  };

  return (
    <div className="p-5 font-sans bg-deep-navy text-white">
      <header className="bg-[var(--vibrant-purple)]">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
          <a href="#" className="text-2xl font-bold">
            Campaigns
          </a>
          <WalletModalPicker />
        </nav>
      </header>

      {!wallet.connected && (
        <p className="text-pinterest mb-4">Please connect your wallet.</p>
      )}

      {wallet.connected && (
        <>
          <div className="mb-6 p-4 border-2 border-soft-lavender rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-vibrant-purple">
              Create Campaign
            </h3>
            {fileID && (
              <img
                src={`https://drive.google.com/thumbnail?id=${fileID}`}
                alt="Selected campaign image"
                width={100}
                height={100}
                className="w-32 h-32 object-cover"
              />
            )}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Campaign name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="px-3 py-2 bg-deep-navy border-2 border-soft-lavender rounded-md focus:outline-none focus:ring-2 focus:ring-vibrant-purple"
              />

              <AnimatedButton
                text="Upload Image"
                trigger={() => {
                  const fileInput = document.getElementById(
                    "file-input"
                  ) as HTMLInputElement;
                  fileInput.click();
                }}
              ></AnimatedButton>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="mt-2">
                {selectedFile && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleUpload}
                      className="px-4 py-2 bg-vibrant-purple hover:bg-soft-lavender text-white font-semibold rounded-md transition-colors"
                    >
                      Upload
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={handleCreateCampaign}
                disabled={!newName}
                className="px-4 py-2 bg-vibrant-purple hover:bg-soft-lavender text-white font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Campaign
              </button>
            </div>
          </div>

          <div className="mb-6 p-4 border-2 border-soft-lavender rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-vibrant-purple">
              Global Actions
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleInitInstitution}
                className="px-4 py-2 bg-vibrant-purple hover:bg-soft-lavender text-white font-semibold rounded-md transition-colors"
              >
                create institition
              </button>
              <button
                onClick={handleClaim}
                className="px-4 py-2 bg-vibrant-purple hover:bg-soft-lavender text-white font-semibold rounded-md transition-colors"
              >
                Claim Earnings
              </button>
              <button
                onClick={handleDisableInst}
                className="px-4 py-2 bg-vibrant-purple hover:bg-soft-lavender text-white font-semibold rounded-md transition-colors"
              >
                Disable Institution
              </button>
              <button
                onClick={handleSetAuth}
                className="px-4 py-2 bg-vibrant-purple hover:bg-soft-lavender text-white font-semibold rounded-md transition-colors"
              >
                Set Authority to Self
              </button>
              <button
                onClick={handleSetFee}
                className="px-4 py-2 bg-vibrant-purple hover:bg-soft-lavender text-white font-semibold rounded-md transition-colors"
              >
                Set Fee (500)
              </button>
              <button
                onClick={handleSubmitContract}
                className="px-4 py-2 bg-vibrant-purple hover:bg-soft-lavender text-white font-semibold rounded-md transition-colors"
              >
                Submit Contract
              </button>
              <a
                href="https://drive.google.com/uc?export=download&id=fileid"
                download
              >
                Download PDF
              </a>
            </div>
          </div>

          <div className="mb-6 p-4 border-2 border-soft-lavender rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-vibrant-purple">
                Existing Campaigns
              </h3>
              <button
                onClick={loadCampaigns}
                className="px-3 py-1 bg-light-green hover:bg-soft-lavender text-deep-navy font-semibold rounded-md transition-colors"
              >
                Reload
              </button>
            </div>
            <ul className="space-y-3">
              {campaigns?.map(({ publicKey, account }) => (
                <li
                  key={publicKey.toBase58()}
                  className="p-3 border border-soft-lavender rounded-md bg-deep-navy bg-opacity-50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <strong className="text-light-green">
                        {account.name}
                      </strong>
                      <span className="text-pinterest ml-2">
                        (Status: {account.status.toString()})
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePause(publicKey)}
                        className="px-3 py-1 bg-soft-lavender hover:bg-vibrant-purple text-deep-navy font-semibold rounded-md transition-colors"
                      >
                        Pause
                      </button>
                      <button
                        onClick={() => handleFinish(publicKey)}
                        className="px-3 py-1 bg-soft-lavender hover:bg-vibrant-purple text-deep-navy font-semibold rounded-md transition-colors"
                      >
                        Finish
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {statusMsg && (
            <p className="p-3 bg-vibrant-purple bg-opacity-20 border border-vibrant-purple rounded-md text-light-green italic">
              {statusMsg}
            </p>
          )}
        </>
      )}
    </div>
  );
};
