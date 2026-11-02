import {
  Banknote,
  CheckCircle2,
  Download,
  Sparkles,
  WalletCards,
} from "lucide-react";

const PayMonth = () => {
  return (
    <section className="overflow-hidden rounded-[17px] border border-[#e0e3e9] bg-white">
      <div className="flex flex-col gap-3 border-b border-[#e9ecf0] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-[10px] bg-[#edf7f2] text-[#2d7757]">
            <Banknote aria-hidden="true" className="size-4.5" />
          </span>
          <div>
            <h3 className="text-[15px] font-semibold text-[#20252c]">
              Mening ish haqim
            </h3>
            <p className="text-[11px] text-[#8a94a2]">
              Oktabr 2026 hisob-kitobi
            </p>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-[9px] border border-[#dce1e7] px-3 text-[11px] font-semibold text-[#586476] transition-colors hover:bg-[#f6f7f9]"
        >
          <Download aria-hidden="true" className="size-3.5" />
          Hisob varaqasi
        </button>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden rounded-[15px] bg-[#292f38] p-5 text-white">
            <Sparkles className="absolute -right-4 -top-4 size-24 text-white/[0.04]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50">
              Qo‘lga tegadigan summa
            </p>
            <p className="mt-2 text-[29px] font-bold tracking-[-0.04em]">
              8 590 000 so‘m
            </p>
            <div className="mt-5 flex items-center gap-2 text-[11px] text-white/60">
              <CheckCircle2 className="size-3.5 text-[#75d6a0]" />
              25-oktabr kuni to‘langan
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              ["Stavka", "8 500 000"],
              ["Hisoblandi", "8 120 000"],
              ["Bonus", "+650 000"],
              ["Ushlanma", "−180 000"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[12px] border border-[#e7eaee] bg-[#fafbfc] p-3"
              >
                <p className="text-[10px] font-medium text-[#8b95a3]">
                  {label}
                </p>
                <p className="mt-1 text-[12px] font-semibold text-[#313842]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-[11px] border border-[#e7eaee] px-3.5 py-3">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-[9px] bg-[#f3effb] text-[#7355a2]">
              <WalletCards className="size-4" />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-[#353c46]">
                To‘lovlar tarixi
              </p>
              <p className="mt-0.5 text-[10px] text-[#929aa6]">
                Barcha oylik va bonuslar
              </p>
            </div>
          </div>
          <button
            type="button"
            className="cursor-pointer text-[11px] font-semibold text-[#d95b27] hover:underline"
          >
            Barchasini ko‘rish
          </button>
        </div>
      </div>
    </section>
  );
};

export default PayMonth;
