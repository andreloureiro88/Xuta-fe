import React, { useState, useEffect } from "react";
import { InstitutionForm } from "../components/InstitutionForm";
import { XutaService } from "../services/XutaService";
import { useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider } from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";
import UploadService from "../services/UploadService";
import WalletModalPicker from "../components/WalletModalPicker";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { Image } from "primereact/image";
import Institution from "../models/Institution";
import { useNavigate } from "react-router-dom";

export const Institutions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [configExists, setConfigExists] = useState(false);
  const [service, setService] = useState<XutaService | null>(null);
  const [uploadService, setUploadService] = useState<UploadService | null>(
    null
  );
  const wallet = useWallet();
  const navigate = useNavigate();

  const fetchConfig = async () => {
    const config = await service?.getConfig();
    console.log("config", config);
    setConfigExists(!!config);
  };

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
        preflightCommitment: "confirmed",
      });
      const xutaService = new XutaService(provider);
      setService(xutaService);
      setUploadService(new UploadService());
      uploadService?.wakeUpServer();
    }
  }, [wallet]);

  useEffect(() => {
    fetchConfig();
    fetchInstitutions();
  }, [service]);

  const filteredInstitutions = institutions.filter((institution) =>
    institution.account.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInitialize = async () => {
    await service?.initialize();
    fetchConfig();
  };

  return (
    <div className="container mx-auto px-4 pt-6 pb-2">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Button
            icon="pi pi-home"
            rounded
            text
            severity="secondary"
            onClick={() => navigate("/")}
            tooltip="Go to Home"
            tooltipOptions={{ position: "bottom" }}
          />
          <h1 className="text-3xl font-bold text-soft-lavender flex items-center">
            <i className="pi pi-building mr-2"></i>
            Institutions
          </h1>
        </div>
        <div className="flex gap-2">
          {wallet.connected && (
            <>
              {configExists ? (
                <Button
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                  severity="success"
                  label="Create Institution"
                  className="p-button-raised"
                  icon="pi pi-plus"
                />
              ) : (
                <Button
                  onClick={handleInitialize}
                  severity="info"
                  label="Initialize Program"
                  className="p-button-raised"
                  icon="pi pi-cog"
                />
              )}
            </>
          )}
          <WalletModalPicker />
        </div>
      </div>

      {!wallet.connected && (
        <p className="text-white mb-4">Please connect your wallet.</p>
      )}

      {wallet.connected && (
        <>
          <div className="mb-6">
            <span className="p-input-icon-left w-full">
              <FloatLabel>
                <span className="p-input-icon-left w-full">
                  <i className="pi pi-search pl-4 text-soft-lavender" />
                  <InputText
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-6"
                  />
                </span>
                <label htmlFor="search" className="text-soft-lavender pl-6">
                  Institution name
                </label>
              </FloatLabel>
            </span>
          </div>

          <div className="flex flex-wrap gap-4 w-full">
            {filteredInstitutions.map((institution) => (
              <div
                key={institution.publicKey}
                className="flex-1 min-w-[calc(33.333%-1rem)] max-w-[calc(33.333%-1rem)] shadow-2 border-round-xl h-full overflow-hidden bg-deep-navy border-2 border-soft-lavender relative"
              >
                <div className="overflow-hidden flex items-center w-full h-[13rem]">
                  <Image
                    src={`${institution.account.image}`}
                    alt={institution.account.name}
                    className="object-cover border-round-top-xl !w-full"
                    preview
                    width="100%"
                    zoomSrc={`${institution.account.image}`}
                  />

                  <Tag
                    value={institution.account.isActive ? "Active" : "Inactive"}
                    severity={
                      institution.account.isActive ? "success" : "danger"
                    }
                    className="absolute top-2 right-2"
                    rounded
                  />
                </div>

                <div className="p-2 flex flex-column gap-2">
                  <div className="p-2 flex align-items-center gap-2">
                    <i className="pi pi-building text-primary"></i>
                    <span className="text-xl font-semibold text-900">
                      {institution.account.name}
                    </span>
                  </div>
                  <div className="p-2 flex flex-column gap-3">
                    <p className="m-0 line-clamp-3 text-700">
                      {institution.account.description}
                    </p>
                  </div>
                  <div className="p-2 flex justify-content-between align-items-center">
                    <Button
                      icon="pi pi-file-pdf"
                      label="Contract"
                      severity="success"
                      onClick={() =>
                        window.open(
                          `https://drive.google.com/uc?export=download&id=${institution.account.contract}`
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal */}
      {service && uploadService && (
        <Dialog
          style={{ width: "50vw", maxWidth: "800px" }}
          header="Create Institution"
          visible={isModalOpen}
          onHide={() => setIsModalOpen(false)}
        >
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
        </Dialog>
      )}
    </div>
  );
};
