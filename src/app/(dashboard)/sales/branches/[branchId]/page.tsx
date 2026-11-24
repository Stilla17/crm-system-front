import { Suspense } from "react";
import { BranchProductsTable } from "src/components/sales/branch-products-table";

export default function BranchProductsPage({
  params,
}: PageProps<"/sales/branches/[branchId]">) {
  return (
    <div className="p-3 sm:p-5">
      <Suspense
        fallback={
          <div className="min-h-72 rounded-[18px] border border-[#dfe2e7] bg-white" />
        }
      >
        <BranchProductsRoute params={params} />
      </Suspense>
    </div>
  );
}

async function BranchProductsRoute({
  params,
}: {
  params: Promise<{ branchId: string }>;
}) {
  const { branchId: branchSlug } = await params;

  return <BranchProductsTable branchSlug={branchSlug} />;
}
