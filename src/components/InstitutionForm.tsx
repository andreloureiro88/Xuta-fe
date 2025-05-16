import { AnchorProvider } from "@coral-xyz/anchor";
import { AnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import { XutaService } from "../services/XutaService";
import UploadService from "../services/UploadService";
import { PublicKey } from "@solana/web3.js";
import AnimatedButton from "./AnimatedButton";
import toast from "react-hot-toast";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";

interface InstitutionForm {
  pubkey: string;
  name: string;
  image: File | null;
  description: string;
  contract: File | null;
}

interface FormErrors {
  pubkey?: string;
  name?: string;
  image?: string;
  contract?: string;
  description?: string;
}

interface InstitutionFormProps {
  xutaService: XutaService;
  uploadService: UploadService;
  onSuccess?: () => void;
  onFail?: (error: Error) => void;
}

export const InstitutionForm: React.FC<InstitutionFormProps> = ({
  xutaService,
  uploadService,
  onSuccess,
  onFail,
}) => {
  const [form, setForm] = useState<InstitutionForm>({
    pubkey: "",
    name: "",
    image: null,
    contract: null,
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const wallet = useWallet();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.pubkey.trim()) errs.pubkey = "Public key is required.";
    if (!form.name.trim()) errs.name = "Name is required.";

    if (!form.image) errs.image = "Image is required.";
    if (!form.contract) errs.contract = "Contract is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    console.log(name, value, files);
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit");
    if (!validate()) return;
    setIsLoading(true);

    try {
      console.log("past");
      // Upload files first
      const imageUrl = await uploadService.uploadFile(
        form.image!,
        "institution"
      );
      const contractUrl = await uploadService.uploadFile(
        form.contract!,
        "institution"
      );

      // Create institution
      await xutaService.initInstitution(
        imageUrl.fileId,
        form.name,
        form.description,
        contractUrl.fileId,
        new PublicKey(form.pubkey)
      );

      toast.success("Institution created successfully");
      onSuccess?.();
      setIsLoading(false);
      // Reset form or handle success
    } catch (error) {
      console.error("Error creating institution:", error);
      onFail?.(error as Error);
      setIsLoading(false);
      toast.error(error.message);
      // Handle error
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
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-30 bg-gray-200 items-center justify-center rounded border border-dashed border-soft-lavender mb-2">
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Institution preview"
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
              id="pubkey"
              name="pubkey"
              value={form.pubkey}
              onChange={handleChange}
              className="w-full"
            />
            <label htmlFor="pubkey">Public Key</label>
          </FloatLabel>
          {errors.pubkey && (
            <small className="p-error block mt-1">{errors.pubkey}</small>
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
            />
            <label htmlFor="name">Name</label>
          </FloatLabel>
          {errors.name && (
            <small className="p-error block mt-1">{errors.name}</small>
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
              placeholder="Enter institution description..."
            />
            <label htmlFor="description">Description</label>
          </FloatLabel>
          {errors.description && (
            <small className="p-error block mt-1">{errors.description}</small>
          )}
        </div>

        <div className="flex items-center justify-between ">
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
