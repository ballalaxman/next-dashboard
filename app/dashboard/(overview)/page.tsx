import React, { Suspense } from "react";
import { lusitana } from "../../ui/font";
import CardWrapper, { Card } from "../../ui/dashboard/cards";
import RevenueChart from "../../ui/dashboard/revenue-chart";
import { fetchCardData, fetchLatestInvoices } from "../../lib/data";
import LatestInvoices from "../../ui/dashboard/latest-invoices";
import {
  CardsSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from "@/app/ui/skeletons";

const Dashboard = async () => {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-5 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
};

export default Dashboard;
