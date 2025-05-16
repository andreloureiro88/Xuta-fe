import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Campaign from "../models/Campaign";
interface CampaignDetailModalProps {
  visible: boolean;
  onHide: () => void;
  campaign: Campaign | null;
}

const formatDate = (unix: number) => {
  const d = new Date(unix * 1000);
  return d.toLocaleDateString();
};

const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({
  visible,
  onHide,
  campaign,
}) => {
  if (!campaign) return null;
  return (
    <Dialog
      header={campaign.account.name}
      visible={visible}
      style={{ width: "90vw", maxWidth: 500 }}
      onHide={onHide}
      modal
    >
      <div className="flex flex-col gap-4">
        <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded overflow-hidden">
          {campaign.account.image ? (
            <img
              src={campaign.account.image}
              alt={campaign.account.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-400 text-4xl">✖</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-lg mb-1">
            {campaign.account.name}
          </div>
          <div className="text-xs text-gray-500 mb-2">
            {campaign.account.institutionName}
          </div>
          <div className="text-sm text-gray-700 mb-2 whitespace-pre-line">
            {campaign.account.description}
          </div>
          <div className="text-xs text-gray-400 mb-2">
            {formatDate(campaign.account.intialDate)}{" "}
            <span className="mx-1">-</span>{" "}
            {formatDate(campaign.account.dueDate)}
          </div>
          <div className="mb-2">
            <Button
              icon="pi pi-file-pdf"
              label="View contract"
              severity="success"
              onClick={() =>
                window.open(
                  `https://drive.google.com/uc?export=download&id=${campaign.account.contract}`
                )
              }
            />
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-800 border border-gray-400">
              {Object.keys(campaign.account.status)[0]}
            </span>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <Button label="Close" onClick={onHide} className="p-button-text" />
        </div>
      </div>
    </Dialog>
  );
};

export default CampaignDetailModal;
