"use client";
import axios from "axios";
import { useState } from "react";
import { useCreateCompany } from "src/hooks/companies/useCreateCompany";
import type { CompanyFormValues } from "src/types/company";
import CustomModal from "../header/custom-modal";
import CompanyForm from "./company-form";
import { toast } from "sonner";

const CompanyFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createCompany, isPending } = useCreateCompany();

  const onSubmit = (data: CompanyFormValues) => {
    console.log(data);
    createCompany(data, {
      onSuccess: (res) => {
        console.log(`Company yaratildi: ${res}`);
        toast.success("Kompaniya muvaffaqiyatli yaratildi");
        setIsOpen(false);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          console.error("Backend javobi:", error.response?.data);
          console.error("Status:", error.response?.status);
          toast.error("Kompaniyani yaratishda xatolik yuz berdi");
        }
      },
    });
  };

  return (
    <CustomModal
      title="Kompaniya qo'shish"
      description="Bu yerda yangi kompaniya yaratishingiz mumkin"
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <button
          type="button"
          className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-[10px] border border-dashed border-[#b8c5d6] bg-[#f7f9fc] px-3.5 text-[13px] font-medium text-[#315487] transition-colors hover:border-[#2467d1] hover:bg-[#edf4ff] hover:text-[#1d5bb8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2467d1]"
        >
          <span className="text-lg leading-none">+</span>
          Yangi kompaniya
        </button>
      }
    >
      {isOpen && (
        <CompanyForm
          submitLabel="Yaratish"
          isSubmitting={isPending}
          onSubmit={onSubmit}
        />
      )}
    </CustomModal>
  );
};

export default CompanyFormModal;
