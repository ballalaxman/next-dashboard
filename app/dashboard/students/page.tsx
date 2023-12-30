import { lusitana } from "@/app/ui/font";
import Search from "@/app/ui/search";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { AddStudent } from "@/app/ui/students/buttons";
import React, { Suspense } from "react";
import Table from "@/app/ui/students/table";

const Page = () => {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>
          Students
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <AddStudent />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table query={""} currentPage={0} />
      </Suspense>
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
};

export default Page;
