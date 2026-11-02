import { CalendarCheck2 } from "lucide-react";
import { profile } from "src/app/(dashboard)/profile/page";

const WorkDay = () => {
  return (
    <section className="overflow-hidden rounded-[17px] border border-[#dce4df] bg-white">
      <div className="flex flex-col gap-4 bg-[linear-gradient(110deg,#edf8f2,#f8fbf9)] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-[13px] bg-[#dff2e7] text-[#287252]">
            <CalendarCheck2 aria-hidden="true" className="size-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-semibold text-[#202a25]">
                Bugungi ish kuni
              </h3>
              <span className="rounded-full bg-[#dff2e7] px-2 py-0.5 text-[10px] font-semibold text-[#26704f]">
                Ishda
              </span>
            </div>
            <p className="mt-1 text-[12px] text-[#758078]">
              Payshanba, 22-oktabr · {profile.location}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 rounded-[12px] bg-white/75 px-4 py-3 shadow-[inset_0_0_0_1px_rgba(213,226,218,0.9)]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.06em] text-[#87928a]">
              Kirish
            </p>
            <p className="mt-1 text-[14px] font-bold text-[#29332e]">08:52</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.06em] text-[#87928a]">
              Ishlandi
            </p>
            <p className="mt-1 text-[14px] font-bold text-[#29332e]">06:18</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.06em] text-[#87928a]">
              Chiqish
            </p>
            <p className="mt-1 text-[14px] font-bold text-[#29332e]">18:00</p>
          </div>
        </div>
      </div>

      <div className="grid divide-y divide-[#edf0f3] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {[
          ["Oylik davomat", "96%", "22 kundan 21 kun"],
          ["Kechikish", "2 marta", "Jami 18 daqiqa"],
          ["Ta’til qoldig‘i", "14 kun", "2026-yil uchun"],
        ].map(([label, value, note]) => (
          <div key={label} className="px-5 py-4">
            <p className="text-[11px] font-medium text-[#7d8795]">{label}</p>
            <p className="mt-1 text-[20px] font-bold tracking-[-0.03em] text-[#252b33]">
              {value}
            </p>
            <p className="mt-1 text-[10px] text-[#9aa2ad]">{note}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkDay;
