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

const isCampaignOngoing = (initialDate: number, dueDate: number) => {
  const now = new Date();
  const initial = new Date(initialDate * 1000);
  const due = new Date(dueDate * 1000);
  return now >= initial && now <= due;
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
    <div className="lg:max-w-[300px] h-[400px] mx-auto border rounded-lg shadow-sm flex flex-col w-full relative overflow-hidden bg-deep-navy border-2 border-soft-lavender font-crypto">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400 text-4xl">✖</span>
          </div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-end p-4">
        <div className="mt-auto">
          <div className="flex gap-2 mb-2">
            <span className="font-semibold font-crypto text-lg text-white truncate flex-1">
              {name}
            </span>
          </div>
          <div className="text-xs text-gray-300 mb-1 truncate">
            {institutionName}
          </div>
          <div className="text-xs text-gray-400 mb-4">
            {formatDate(initialDate)} <span className="mx-1">-</span>{" "}
            {formatDate(dueDate)}
          </div>
          {isCampaignOngoing(initialDate, dueDate) ? (
            <div className="flex gap-2">
              <Button
                label="Buy Tokens"
                severity="success"
                size="small"
                className="w-full"
                onClick={() => onAction?.(id)}
              />
              <Button
                severity="info"
                size="small"
                label="View Details"
                className="w-full p-button-secondary"
                onClick={() => onAction?.(id)}
              />
            </div>
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
