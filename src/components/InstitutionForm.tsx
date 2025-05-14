import { AnchorProvider } from "@coral-xyz/anchor";
import { AnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import { XutaService } from "../services/XutaService";
import UploadService from "../services/UploadService";
import { PublicKey } from "@solana/web3.js";
import AnimatedButton from "./AnimatedButton";
import toast from "react-hot-toast";

interface InstitutionForm {
  pubkey: string;
  name: string;
  image: File | null;
  contract: File | null;
}

interface FormErrors {
  pubkey?: string;
  name?: string;
  image?: string;
  contract?: string;
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
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
        form.name,
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
        className="max-w-md mx-auto p-4 bg-deep-navy text-white rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-soft-lavender text-center">
          Create Institution
        </h2>

        <div className="mb-4">
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded border border-dashed border-soft-lavender mb-2">
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

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const fileInput = document.getElementById(
                "file-input"
              ) as HTMLInputElement;
              fileInput.click();
            }}
            className="w-full py-2 px-4 rounded bg-gradient-to-r from-vibrant-purple to-soft-lavender text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Choose Image
          </button>
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-soft-lavender">
            Pubkey
          </label>
          <input
            type="text"
            name="pubkey"
            value={form.pubkey}
            onChange={handleChange}
            className="w-full p-2 rounded border border-soft-lavender bg-transparent text-white"
          />
          {errors.pubkey && (
            <p className="text-red-500 text-sm">{errors.pubkey}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-soft-lavender">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded border border-soft-lavender bg-transparent text-white"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-6">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const contractInput = document.getElementById(
                "contract-input"
              ) as HTMLInputElement;
              contractInput.click();
            }}
            className="w-full py-2 px-4 rounded bg-gradient-to-r from-vibrant-purple to-soft-lavender text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Choose Contract
          </button>
          {form.contract && (
            <p className="text-sm mb-1 text-soft-lavender">
              {form.contract?.name}
            </p>
          )}
          {errors.contract && (
            <p className="text-red-500 text-sm">{errors.contract}</p>
          )}
        </div>

        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-soft-lavender"></div>
          </div>
        )}

        {!isLoading && (
          <button
            type="submit"
            className="w-full py-2 px-4 rounded bg-gradient-to-r from-vibrant-purple to-soft-lavender text-white font-semibold"
          >
            Create
          </button>
        )}
      </form>
    </>
  );
};
