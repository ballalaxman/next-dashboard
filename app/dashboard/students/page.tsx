import { fetchStudentPages } from "@/app/lib/data";
import { lusitana } from "@/app/ui/font";
import Search from "@/app/ui/search";
import { AddStudent } from "@/app/ui/students/buttons";
import React from "react";
import Table from "@/app/ui/students/table";

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
      <Table query={query} currentPage={currentPage} />
    </div>
  );
};

export default Page;
