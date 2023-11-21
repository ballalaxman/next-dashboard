import React, { Suspense } from "react";
import Customerstable from "@/app/ui/customers/table";
import { fetchFilteredCustomers } from "@/app/lib/data";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const customers = await fetchFilteredCustomers(query);
  return (
    <div className="w-full">
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Customerstable customers={customers} />
      </Suspense>
    </div>
  );
};

export default Page;
