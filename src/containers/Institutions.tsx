import React, { useState, useEffect } from "react";
import { InstitutionForm } from "../components/InstitutionForm";
import { XutaService } from "../services/XutaService";
import { useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider } from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";
import UploadService from "../services/UploadService";
import WalletModalPicker from "../components/WalletModalPicker";
import toast from "react-hot-toast";

interface Institution {
  publicKey: string;
  account: {
    name: string;
    description: string;
    image: string;
    contract: string;
    authority: string;
    isActive: boolean;
  };
}

export const Institutions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [service, setService] = useState<XutaService | null>(null);
  const [uploadService, setUploadService] = useState<UploadService | null>(
    null
  );
  const wallet = useWallet();

  const fetchInstitutions = async () => {
    if (service) {
      try {
        const insts = await service.getInstituttions();
        console.log("insts", insts);
        setInstitutions(insts);
      } catch (error) {
        console.error("Error fetching institutions:", error);
      }
    }
  };

  useEffect(() => {
    if (wallet.publicKey && wallet.signTransaction) {
      const connection = new Connection("http://localhost:8899", "confirmed");
      const provider = new AnchorProvider(connection, wallet as any, {
        commitment: "confirmed",
      });
      const xutaService = new XutaService(provider);
      setService(xutaService);
      setUploadService(new UploadService());
    }
  }, [wallet]);

  useEffect(() => {
    fetchInstitutions();
  }, [service]);

  const filteredInstitutions = institutions.filter((institution) =>
    institution.account.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-soft-lavender">Institutions</h1>

        {wallet.connected && (
          <button
            onClick={() => {
              setIsModalOpen(true);
              toast.success("hey");
            }}
            className="bg-gradient-to-r from-vibrant-purple to-soft-lavender text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Create Institution
          </button>
        )}
        <WalletModalPicker />
      </div>

      {!wallet.connected && (
        <p className="text-white mb-4">Please connect your wallet.</p>
      )}

      {wallet.connected && (
        <>
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search institutions by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg bg-deep-navy border border-soft-lavender text-white placeholder-gray-400 focus:outline-none focus:border-vibrant-purple"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstitutions.map((institution) => (
              <div
                key={institution.publicKey}
                className="bg-deep-navy rounded-xl p-6 shadow-lg border border-soft-lavender"
              >
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <img
                    src={`https://drive.google.com/thumbnail?id=${institution.account.image}`}
                    alt={institution.account.name}
                    className="object-cover rounded-lg w-full h-48"
                  />
                </div>
                <h3 className="text-xl font-semibold text-soft-lavender mb-2">
                  {institution.account.name}
                </h3>
                <p className="text-gray-300 mb-4">
                  {institution.account.description}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      institution.account.isActive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {institution.account.isActive ? "Active" : "Inactive"}
                  </span>
                  <a
                    href={`https://drive.google.com/uc?export=download&id=${institution.account.contract}`}
                    rel="noopener noreferrer"
                    className="text-light-green hover:text-dark-green transition-colors"
                  >
                    View Contract
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal */}
      {isModalOpen && service && uploadService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="z-10 bg-deep-navy rounded-2xl p-6 max-w-2xl w-full mx-4 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-soft-lavender hover:text-vibrant-purple"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <InstitutionForm
              xutaService={service}
              uploadService={uploadService}
              onSuccess={() => {
                setIsModalOpen(false);
                fetchInstitutions();
              }}
              onFail={(error) => {
                console.error("Error creating institution:", error);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
