"use client";

import { LoaderCircle } from "lucide-react";
import { useIsFetching } from "@tanstack/react-query";

const DashboardLoadingOverlay = () => {
  const initialQueriesCount = useIsFetching({
    predicate: (query) =>
      query.state.data === undefined && query.state.fetchStatus === "fetching",
  });

  if (initialQueriesCount === 0) {
    return null;
  }
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <LoaderCircle className="size-9 animate-spin text-[#42282e]" />

        <p className="text-sm font-medium text-[#42282e]">
          Ma’lumotlar yuklanmoqda...
        </p>
      </div>
    </div>
  );
};

export default DashboardLoadingOverlay;
