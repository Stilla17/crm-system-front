"use client";

import type { CompanyFormValues, Props } from "src/types/company";
import CustomModal from "../header/custom-modal";
import CompanyForm from "./company-form";
import { useUpdateCompany } from "src/hooks/companies/useUpdateCompany";

const CompanyEditModal = ({ company, open, onClose }: Props) => {
  const { mutate: updateCompany, isPending } = useUpdateCompany();
  const handleSubmit = (values: CompanyFormValues) => {
    updateCompany(
      {
        id: company.id,
        data: values,
      },
      {
        onSuccess: onClose,
      },
    );
  };
  return (
    <CustomModal
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
      title="Kompaniyani tahrirlash"
      description="Kompaniya ma’lumotlarini o‘zgartiring"
    >
      <CompanyForm
        defaultValues={{
          companyName: company.companyName,
          type: company.type,
          brandColor: company.brandColor,
        }}
        isSubmitting={isPending}
        submitLabel="Saqlash"
        onSubmit={handleSubmit}
      />
    </CustomModal>
  );
};

export default CompanyEditModal;
