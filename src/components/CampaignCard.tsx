import React from "react";
import { Button } from "primereact/button";

interface CampaignCardProps {
  id: string;
  name: string;
  institutionName: string;
  description: string;
  image: string;
  contract: string;
  initialDate: number;
  dueDate: number;
  status: string;
  onAction?: (id: string) => void;
}

const statusColor = {
  Active: "bg-green-100 text-green-800 border-green-400",
  Upcoming: "bg-yellow-100 text-yellow-800 border-yellow-400",
  Past: "bg-gray-100 text-gray-800 border-gray-400",
};

const formatDate = (unix: number) => {
  const d = new Date(unix * 1000);
  return d.toLocaleDateString();
};

export const CampaignCard: React.FC<CampaignCardProps> = ({
  id,
  name,
  institutionName,
  description,
  image,
  contract,
  initialDate,
  dueDate,
  status,
  onAction,
}) => {
  return (
    <div className="lg:max-w-[200px] max-h-[300px] mx-auto border rounded-lg shadow-sm flex flex-col w-full h-full items-center justify-center bg-deep-navy border-2 border-soft-lavender font-crypto">
      <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="object-cover w-full h-full" />
        ) : (
          <span className="text-gray-400 text-4xl">✖</span>
        )}
      </div>
      <div className="flex-1 flex flex-col p-4 w-full bg-grey-100">
        <div className="flex  gap-2 mb-2">
          <span className="font-semibold font-crypto text-lg truncate flex-1">
            {name}
          </span>
        </div>
        <div className="text-xs text-gray-500 mb-1 truncate">
          {institutionName}
        </div>

        <div className="text-xs text-gray-400 mb-4">
          {formatDate(initialDate)} <span className="mx-1">-</span>{" "}
          {formatDate(dueDate)}
        </div>
        <div className="mt-auto">
          {status === "active" ? (
            <Button
              label="Buy Tokens"
              severity="success"
              size="small"
              className="w-full"
              onClick={() => onAction?.(id)}
            />
          ) : (
            <Button
              severity="info"
              size="small"
              label="View Details"
              className="w-full p-button-secondary"
              onClick={() => onAction?.(id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
