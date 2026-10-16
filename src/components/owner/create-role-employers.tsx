"use client";
import { BriefcaseBusiness, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateRole } from "src/hooks/roles/useCreateRole";

const CreateRoleForEmployers = () => {
  const { mutate: createRole, isPending } = useCreateRole();
  const [slugRole, setSlugRole] = useState("");
  const [roleName, setRoleName] = useState("");

  const handleSubmitRole = () => {
    const normalizedRoleName = roleName.trim();
    const normalizedSlug = slugRole.trim().toLowerCase();

    if (!normalizedRoleName || !normalizedSlug) {
      toast.warning("Lavozim nomi va slugni kiriting");
      return;
    }

    createRole(
      {
        roleName: normalizedRoleName,
        slug: normalizedSlug,
        permissions: [],
        isActive: true,
      },
      {
        onSuccess: () => {
          toast.success("Lavozim yaratildi");
          setRoleName("");
          setSlugRole("");
        },
        onError: () => {
          toast.error("Lavozim yaratishda xatolik yuz berdi");
        },
      },
    );
  };

  return (
    <aside
      aria-labelledby="create-role-title"
      className="border-t border-[#e9ebef] bg-[#fbfbfc] p-5 xl:border-t-0"
    >
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-[#fff0e9] text-[#c65b2c]">
          <BriefcaseBusiness aria-hidden="true" className="size-5" />
        </div>
        <div>
          <h3
            id="create-role-title"
            className="text-[15px] font-semibold text-[#15191f]"
          >
            Yangi lavozim
          </h3>
          <p className="mt-1 text-[12px] leading-4.25 text-[#7a8595]">
            Kompaniya uchun yangi rol va ruxsatlar yarating
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
            Lavozim nomi
          </span>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Masalan: Sotuv menejeri"
            className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-white px-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#a0a8b3] focus:border-[#e8622a] focus:ring-4 focus:ring-[#e8622a]/10"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
            Slug
          </span>
          <input
            type="text"
            value={slugRole}
            onChange={(e) => setSlugRole(e.target.value)}
            placeholder="sales-manager"
            className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-white px-3 font-mono text-[12px] text-[#303742] outline-none transition placeholder:text-[#a0a8b3] focus:border-[#e8622a] focus:ring-4 focus:ring-[#e8622a]/10"
          />
        </label>

        {/* <fieldset>
          <legend className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
            Asosiy ruxsatlar
          </legend>
          <div className="mt-2 space-y-2">
            {[
              "Xodimlarni ko‘rish",
              "Xodim qo‘shish",
              "Ma’lumotlarni tahrirlash",
            ].map((permission, index) => (
              <label
                key={permission}
                className="flex cursor-pointer items-center gap-2.5 rounded-[10px] border border-[#e3e6ea] bg-white px-3 py-2.5 text-[12px] font-medium text-[#515c6c] transition has-checked:border-[#efb096] has-checked:bg-[#fff8f4] has-checked:text-[#9a4825]"
              >
                <input
                  type="checkbox"
                  defaultChecked={index === 0}
                  className="size-4 accent-[#e8622a]"
                />
                {permission}
              </label>
            ))}
          </div>
        </fieldset> */}

        <button
          type="button"
          onClick={handleSubmitRole}
          disabled={isPending}
          className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#e8622a] px-4 text-[13px] font-semibold text-white transition hover:bg-[#d85620] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8622a]"
        >
          <Plus aria-hidden="true" className="size-4" />
          Lavozim yaratish
        </button>
      </div>
    </aside>
  );
};

export default CreateRoleForEmployers;
