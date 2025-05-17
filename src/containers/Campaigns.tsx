import React, { useEffect, useState, useMemo } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { XutaService } from "../services/XutaService";
import { Button } from "primereact/button";
import CampaignCard from "../components/CampaignCard";
import CampaignDetailModal from "../components/CampaignDetailModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider } from "@coral-xyz/anchor";
import Campaign from "../models/Campaign";
import { FloatLabel } from "primereact/floatlabel";
import { Dialog } from "primereact/dialog";
import { CampaignForm } from "../components/CampaignForm";
import UploadService from "../services/UploadService";
import WalletModalPicker from "../components/WalletModalPicker";
import Institution from "../models/Institution";
import { Carousel } from "primereact/carousel";
import { useNavigate } from "react-router-dom";

// Dummy types, replace with your actual campaign type

const categorizeCampaign = (
  campaign: Campaign
): "Active" | "Upcoming" | "Past" => {
  const now = Date.now() / 1000;
  if (campaign.account.initialDate > now) return "Upcoming";
  if (campaign.account.dueDate < now && campaign.account.initialDate < now)
    return "Past";
  return "Active";
};

export const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [search, setSearch] = useState("");
  const [institution, setInstitution] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [service, setService] = useState<XutaService | null>(null);
  const wallet = useWallet();
  const [createCampaignModalVisible, setCreateCampaignModalVisible] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (wallet.publicKey && wallet.signTransaction) {
      const connection = new Connection("http://localhost:8899", "confirmed");
      const provider = new AnchorProvider(connection, wallet as any, {
        commitment: "confirmed",
      });
      const xutaService = new XutaService(provider);
      setService(xutaService);
    }
  }, [wallet]);

  useEffect(() => {
    setLoading(true);

    service?.getInstituttions().then((data: Institution[]) => {
      setInstitutions(data);
      data.forEach((inst) => {
        console.log("Institution Public Key:", inst.publicKey.toString());
        console.log(
          "Institution Authority:",
          inst.account.authority.toString()
        );
      });
    });

    service?.getAllCampaigns().then((data: Campaign[]) => {
      console.log(data);

      data.forEach((campaign) => {
        console.log("Campaign Public Key:", campaign.publicKey.toString());
        console.log(
          "Campaign Authority:",
          campaign.account.authority.toString()
        );
      });
      setCampaigns(data);
      setLoading(false);
    });
  }, [service]);

  // Get unique institutions for dropdown
  const institutionsOptions = useMemo(
    () =>
      institutions.map((inst) => ({
        label: inst.account.name,
        value: inst.account.authority.toString(),
      })),
    [institutions]
  );

  // Filter campaigns
  const filtered = useMemo(() => {
    console.log("institutions", institutions);
    console.log("institution 2", institution?.toString());
    const selectedInstitution = institutions.find(
      (inst) => inst.account?.authority?.toString() === institution?.toString()
    );
    return campaigns.filter((c) => {
      const matchesName = c.account.name
        .toLowerCase()
        .includes(search.toLowerCase());
      console.log("c.account.authority", c.account.authority);
      console.log("institution", selectedInstitution);
      const matchesInstitution =
        !selectedInstitution ||
        c.account.authority?.toString() ===
          selectedInstitution?.account?.authority?.toString();

      return matchesName && matchesInstitution;
    });
  }, [campaigns, search, institutions, institution]);

  // Categorize
  const active = filtered.filter((c) => categorizeCampaign(c) === "Active");
  const upcoming = filtered.filter((c) => categorizeCampaign(c) === "Upcoming");
  const past = filtered.filter((c) => categorizeCampaign(c) === "Past");

  const carouselSettings = [
    { breakpoint: "1400px", numVisible: 4, numScroll: 1 },
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "600px", numVisible: 1, numScroll: 1 },
  ];

  const handleCardAction = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setModalVisible(true);
  };

  const refreshCampaigns = () => {
    setLoading(true);
    service?.getAllCampaigns().then((data: Campaign[]) => {
      setCampaigns(data);
      setLoading(false);
    });
  };

  const uploadService = new UploadService();

  const campaignCardTemplate = (c: Campaign) => (
    <div className="font-crypto">
      <CampaignCard
        key={c.account.authority}
        id={c.account.authority}
        name={c.account.name}
        institutionName={
          institutions.find(
            (inst) =>
              inst.account.authority?.toString() ===
              c.account.authority?.toString()
          )?.account.name || "Unknown"
        }
        description={c.account.description}
        image={c.account.image}
        contract={c.account.contract}
        initialDate={c.account.initialDate}
        dueDate={c.account.dueDate}
        status={Object.keys(c.account.status)[0]}
        onAction={() => handleCardAction(c)}
      />
    </div>
  );

  return (
    <div className="mx-[16rem] mt-6">
      <div className="flex justify-between items-center mb-6">
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
          <h1 className="text-4xl font-bold text-center flex-1">
            Campaign Gallery
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button
            label="Create Campaign"
            icon="pi pi-plus"
            className="ml-4"
            onClick={() => setCreateCampaignModalVisible(true)}
          />
          <WalletModalPicker />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <div className="w-full md:w-1/2">
          <FloatLabel>
            <span className="p-input-icon-left w-full">
              <i className="pi pi-search pl-4 text-soft-lavender" />
              <InputText
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-6"
              />
            </span>
            <label htmlFor="search" className="text-soft-lavender pl-6">
              Search players
            </label>
          </FloatLabel>
        </div>
        <Dropdown
          value={institution}
          options={institutionsOptions}
          onChange={(e) => setInstitution(e.value)}
          placeholder="Select institution"
          className="w-full md:w-1/4"
          showClear
        />
      </div>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Active Campaigns</h2>
        {active.length > 0 && (
          <Carousel
            value={active}
            itemTemplate={campaignCardTemplate}
            numVisible={3}
            numScroll={1}
            responsiveOptions={carouselSettings}
            className="mb-4"
            circular
            showIndicators
            showNavigators
          />
        )}
        {active.length === 0 && (
          <div className="col-span-full text-center text-gray-400">
            No active campaigns.
          </div>
        )}
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Campaigns</h2>
        {upcoming.length > 0 && (
          <Carousel
            value={upcoming}
            itemTemplate={campaignCardTemplate}
            numVisible={3}
            numScroll={1}
            responsiveOptions={carouselSettings}
            className="mb-4"
            circular
            showIndicators
            showNavigators
          />
        )}
        {upcoming.length === 0 && (
          <div className="col-span-full text-center text-gray-400">
            No upcoming campaigns.
          </div>
        )}
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Past Campaigns</h2>
        {past.length > 0 && (
          <Carousel
            value={past}
            itemTemplate={campaignCardTemplate}
            numVisible={3}
            numScroll={1}
            responsiveOptions={carouselSettings}
            className="mb-4"
            circular
            showIndicators
            showNavigators
          />
        )}
        {past.length === 0 && (
          <div className="col-span-full text-center text-gray-400">
            No past campaigns.
          </div>
        )}
      </section>
      <CampaignDetailModal
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
        campaign={selectedCampaign}
      />
      <Dialog
        header="Create Campaign"
        visible={createCampaignModalVisible}
        style={{ width: "95vw", maxWidth: 800 }}
        onHide={() => setCreateCampaignModalVisible(false)}
        modal
      >
        {service && (
          <CampaignForm
            xutaService={service}
            uploadService={uploadService}
            onSuccess={() => {
              setCreateCampaignModalVisible(false);
              refreshCampaigns();
            }}
            onFail={() => setCreateCampaignModalVisible(false)}
          />
        )}
      </Dialog>
    </div>
  );
};

export default Campaigns;
