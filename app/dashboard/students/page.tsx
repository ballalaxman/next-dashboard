import { fetchStudentPages } from "@/app/lib/data";
import { lusitana } from "@/app/ui/font";
import Search from "@/app/ui/search";
import { AddStudent } from "@/app/ui/students/buttons";
import React, { Suspense } from "react";
import Table from "@/app/ui/students/table";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import Pagination from "@/app/ui/invoices/pagination";

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

  const totalPages = await fetchStudentPages(query);

  return (
    <div className="w-full">
      <div className="w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>
          Students
        </h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search students..." />
        <AddStudent />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Page;
