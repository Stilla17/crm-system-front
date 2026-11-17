"use client";

import { useState } from "react";
import { uzbekistanRegions } from "src/data/uzbekistan-regions";

export function UzbekistanMap() {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const selectedRegion = uzbekistanRegions.find(
    (region) => region.id === selectedRegionId,
  );

  function selectRegion(regionId: string) {
    setSelectedRegionId(regionId);
  }

  return (
    <section
      aria-labelledby="uzbekistan-map-title"
      className="rounded-[17px] border border-[#e0e3e9] bg-white p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            id="uzbekistan-map-title"
            className="text-[17px] font-semibold leading-6 text-[#15191f]"
          >
            O‘zbekiston xaritasi
          </h2>
          <p className="mt-1 text-[13px] leading-5 text-[#66748a]">
            Hududni xaritadan yoki ro‘yxatdan tanlang.
          </p>
        </div>
        <span className="rounded-full bg-[#f1f2f4] px-3 py-1 text-[12px] font-medium text-[#586273]">
          {uzbekistanRegions.length} ta hudud
        </span>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)]">
        <div className="flex min-h-[300px] items-center justify-center rounded-[14px] bg-[#f7f8fa] p-3 sm:p-5">
          <svg
            aria-label="O‘zbekiston viloyatlari xaritasi"
            className="h-auto w-full max-w-[650px]"
            role="group"
            viewBox="0 0 620 390"
          >
            {uzbekistanRegions.map((region) => {
              const isSelected = selectedRegionId === region.id;

              return (
                <path
                  key={region.id}
                  aria-label={region.name}
                  aria-pressed={isSelected}
                  className="cursor-pointer outline-none transition-colors focus-visible:stroke-[#202226] focus-visible:stroke-[3] hover:fill-[#f4a17d]"
                  d={region.path}
                  fill={isSelected ? "#e8622a" : "#dce5ef"}
                  onClick={() => selectRegion(region.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      selectRegion(region.id);
                    }
                  }}
                  role="button"
                  stroke="white"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  tabIndex={0}
                >
                  <title>{region.name}</title>
                </path>
              );
            })}
          </svg>
        </div>

        <div>
          <div
            aria-live="polite"
            className="min-h-[58px] rounded-[12px] bg-[#f7f8fa] px-4 py-3"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#8993a2]">
              Tanlangan hudud
            </p>
            <p className="mt-1 text-[14px] font-semibold text-[#202226]">
              {selectedRegion?.name ?? "Hudud tanlanmagan"}
            </p>
          </div>

          <div
            aria-label="Hududlar ro‘yxati"
            className="mt-3 grid grid-cols-2 gap-2"
            role="group"
          >
            {uzbekistanRegions.map((region) => {
              const isSelected = selectedRegionId === region.id;

              return (
                <button
                  key={region.id}
                  aria-pressed={isSelected}
                  className={`min-h-10 rounded-[10px] border px-3 py-2 text-left text-[12px] leading-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2467d1] ${
                    isSelected
                      ? "border-[#e8622a] bg-[#fff3ed] font-semibold text-[#bd4c1f]"
                      : "border-[#e0e3e9] bg-white text-[#586273] hover:bg-[#f7f8fa]"
                  }`}
                  onClick={() => selectRegion(region.id)}
                  type="button"
                >
                  {region.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-4 text-right text-[11px] leading-4 text-[#8993a2]">
        Xarita ma’lumoti:{" "}
        <a
          className="underline underline-offset-2 hover:text-[#586273]"
          href="https://www.geoboundaries.org/"
          rel="noreferrer"
          target="_blank"
        >
          geoBoundaries
        </a>{" "}
        · ODbL 1.0
      </p>
    </section>
  );
}
