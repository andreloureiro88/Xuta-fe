import { AnchorProvider } from "@coral-xyz/anchor";
import { AnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from "react";
import { XutaService } from "../services/XutaService";
import UploadService from "../services/UploadService";
import AnimatedButton from "./AnimatedButton";
import toast from "react-hot-toast";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import Institution from "../models/Institution";
import { Calendar } from "primereact/calendar";

interface CampaignForm {
  name: string;
  description: string;
  ratio: number;
  targetAmount: number;
  initialDate: number;
  dueDate: number;
  image: File | null;
  contract: File | null;
  institutionName: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  ratio?: string;
  targetAmount?: string;
  initialDate?: string;
  dueDate?: string;
  image?: string;
  contract?: string;
  institutionName?: string;
}

interface CampaignFormProps {
  xutaService: XutaService;
  uploadService: UploadService;
  onSuccess?: () => void;
  onFail?: (error: Error) => void;
}

// Add this type for the Calendar event
type CalendarChangeEvent = {
  value: Date | null | undefined;
};

export const CampaignForm: React.FC<CampaignFormProps> = ({
  xutaService,
  uploadService,
  onSuccess,
  onFail,
}) => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  useEffect(() => {
    uploadService.wakeUpServer();
  }, [uploadService]);

  const [form, setForm] = useState<CampaignForm>({
    name: "",
    description: "",
    ratio: 0,
    targetAmount: 0,
    initialDate: Math.floor(Date.now() / 1000),
    dueDate: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
    image: null,
    contract: null,
    institutionName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.description.trim()) errs.description = "Description is required.";
    if (!form.ratio || form.ratio <= 0)
      errs.ratio = "Ratio must be greater than 0.";
    if (!form.targetAmount || form.targetAmount <= 0)
      errs.targetAmount = "Target amount must be greater than 0.";
    if (!form.initialDate) errs.initialDate = "Initial date is required.";
    if (!form.dueDate) errs.dueDate = "Due date is required.";
    if (form.dueDate <= form.initialDate)
      errs.dueDate = "Due date must be after initial date.";
    if (!form.image) errs.image = "Image is required.";
    if (!form.contract) errs.contract = "Contract is required.";
    if (!form.institutionName.trim())
      errs.institutionName = "Institution name is required.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleNumberChange = (
    name: string,
    value: number | null | undefined
  ) => {
    setForm((prev) => ({
      ...prev,
      [name]: value ?? 0,
    }));
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const { files } = e.target;
    setImageFile(files ? files[0] : null);
    setForm((prev) => ({
      ...prev,
      image: files ? files[0] : null,
    }));
  };

  const handleContract = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const { files } = e.target;
    setForm((prev) => ({
      ...prev,
      contract: files ? files[0] : null,
    }));
  };

  const handleDateChange = (field: string, value: Date | null) => {
    setForm((prev) => ({
      ...prev,
      [field]: value ? Math.floor(value.getTime() / 1000) : null,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      // Upload files first
      const imageUrl = await uploadService.uploadFile(form.image!, "campaign");
      const contractUrl = await uploadService.uploadFile(
        form.contract!,
        "campaign"
      );

      // Create campaign
      await xutaService.createCampaign(
        form.name,
        contractUrl.fileId,
        imageUrl.fileId,
        form.description,
        form.ratio,
        form.targetAmount,
        form.initialDate,
        form.dueDate,
        form.institutionName
      );

      toast.success("Campaign created successfully");
      onSuccess?.();
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating campaign:", error);
      onFail?.(error as Error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <input
        id="file-input"
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImage}
        className="hidden"
        autoComplete="off"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
      <input
        id="contract-input"
        type="file"
        name="contract"
        accept="application/pdf"
        onChange={handleContract}
        className="hidden"
        autoComplete="off"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
        autoComplete="off"
      >
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-30 bg-gray-200 items-center justify-center rounded border border-dashed border-soft-lavender mb-2">
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Campaign preview"
                  className="max-h-full max-w-full object-contain rounded"
                />
              ) : (
                <span className="text-gray-500">Image Preview</span>
              )}
            </div>

            <div className="flex justify-center items-center flex-col gap-2">
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const fileInput = document.getElementById(
                    "file-input"
                  ) as HTMLInputElement;
                  fileInput.click();
                }}
                label="Choose Image"
                icon="pi pi-image"
              />
              <span className="text-xs text-gray-500">(max 1MB)</span>
            </div>
          </div>
          {errors.image && (
            <small className="p-error block mt-1">{errors.image}</small>
          )}
        </div>

        <div>
          <FloatLabel>
            <InputText
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full"
              autoComplete="off"
            />
            <label htmlFor="name">Campaign Name</label>
          </FloatLabel>
          {errors.name && (
            <small className="p-error block mt-1">{errors.name}</small>
          )}
        </div>

        <div>
          <FloatLabel>
            <InputText
              id="institutionName"
              name="institutionName"
              value={form.institutionName}
              onChange={handleChange}
              className="w-full"
              autoComplete="off"
            />
            <label htmlFor="institutionName">Institution Name</label>
          </FloatLabel>
          {errors.institutionName && (
            <small className="p-error block mt-1">
              {errors.institutionName}
            </small>
          )}
        </div>

        <div>
          <FloatLabel>
            <InputTextarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full"
              placeholder="Enter campaign description..."
              autoComplete="off"
            />
            <label htmlFor="description">Description</label>
          </FloatLabel>
          {errors.description && (
            <small className="p-error block mt-1">{errors.description}</small>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <FloatLabel>
              <InputNumber
                id="ratio"
                value={form.ratio}
                onValueChange={(e) =>
                  handleNumberChange("ratio", e.value ?? null)
                }
                className="w-full"
                minFractionDigits={2}
                maxFractionDigits={2}
              />
              <label htmlFor="ratio">Ratio</label>
            </FloatLabel>
            {errors.ratio && (
              <small className="p-error block mt-1">{errors.ratio}</small>
            )}
          </div>

          <div>
            <FloatLabel>
              <InputNumber
                id="targetAmount"
                value={form.targetAmount}
                onValueChange={(e) =>
                  handleNumberChange("targetAmount", e.value ?? null)
                }
                className="w-full"
                minFractionDigits={0}
                maxFractionDigits={0}
              />
              <label htmlFor="targetAmount">Target Amount</label>
            </FloatLabel>
            {errors.targetAmount && (
              <small className="p-error block mt-1">
                {errors.targetAmount}
              </small>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <FloatLabel>
              <Calendar
                id="initialDate"
                value={
                  form.initialDate ? new Date(form.initialDate * 1000) : null
                }
                onChange={(e: CalendarChangeEvent) =>
                  handleDateChange("initialDate", e.value ?? null)
                }
                className="w-full"
                showTime
                showSeconds
                dateFormat="dd/mm/yy"
                showIcon
              />
              <label htmlFor="initialDate">Initial Date</label>
            </FloatLabel>
            {errors.initialDate && (
              <small className="p-error block mt-1">{errors.initialDate}</small>
            )}
          </div>

          <div>
            <FloatLabel>
              <Calendar
                id="dueDate"
                value={form.dueDate ? new Date(form.dueDate * 1000) : null}
                onChange={(e: CalendarChangeEvent) =>
                  handleDateChange("dueDate", e.value ?? null)
                }
                className="w-full"
                showTime
                showSeconds
                dateFormat="dd/mm/yy"
                showIcon
              />
              <label htmlFor="dueDate">Due Date</label>
            </FloatLabel>
            {errors.dueDate && (
              <small className="p-error block mt-1">{errors.dueDate}</small>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const contractInput = document.getElementById(
                  "contract-input"
                ) as HTMLInputElement;
                contractInput.click();
              }}
              label="Choose Contract"
              icon="pi pi-file-pdf"
            />
            <span className="text-xs text-gray-500">(max 1MB)</span>
            {form.contract && (
              <p className="text-sm mb-1 text-soft-lavender">
                {form.contract?.name}
              </p>
            )}
            {errors.contract && (
              <p className="text-red-500 text-sm">{errors.contract}</p>
            )}
          </div>
          <div>
            {isLoading && (
              <div className="flex justify-center items-center mr-4">
                <i className="pi pi-spin pi-spinner text-4xl text-light-green"></i>
              </div>
            )}
            {!isLoading && (
              <Button
                type="submit"
                severity="success"
                className="p-button-raised"
                label="Create"
                icon="pi pi-check"
              />
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default CampaignForm;
