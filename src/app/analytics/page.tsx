"use client";

import { Title } from "@tremor/react";
import HistoryChart from "@/components/HistoryChart";

export default function DashboardAnalytics() {
  return (
    <>
      <div className="space-y-8">
        <Title className="!text-2xl font-bold border-b pb-2 mb-4">
          Analytics
        </Title>
        <HistoryChart />
      </div>
    </>
  );
}
