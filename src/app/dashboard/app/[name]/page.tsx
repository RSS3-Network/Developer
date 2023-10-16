"use client";

import { AreaChart, Title, DateRangePicker } from "@tremor/react";
import { PasswordInput, Input } from "@mantine/core";

export default function DashboardApp({
  params,
}: {
  params: {
    name: string;
  };
}) {
  const chartdata = [
    {
      date: "Jan 22",
      SemiAnalysis: 2890,
    },
    {
      date: "Feb 22",
      SemiAnalysis: 2756,
    },
    {
      date: "Mar 22",
      SemiAnalysis: 3322,
    },
    {
      date: "Apr 22",
      SemiAnalysis: 3470,
    },
    {
      date: "May 22",
      SemiAnalysis: 3475,
    },
    {
      date: "Jun 22",
      SemiAnalysis: 3129,
    },
  ];

  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return (
    <>
      <div className="mb-4 flex justify-between border-b pb-2">
        <Title className="!text-2xl font-bold">RSS3 App - {params.name}</Title>
        <DateRangePicker
          className="max-w-sm"
          defaultValue={{
            from: sevenDaysAgo,
            to: today,
          }}
        />
      </div>
      <div className="mb-4">
        <Title className="!text-base">Requests</Title>
        <Title className="!text-2xl font-medium">238243</Title>
      </div>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata}
        index="date"
        categories={["SemiAnalysis"]}
        colors={["blue"]}
      />
      <div className="my-4">
        <Title className="!text-2xl">Settings</Title>
      </div>
      <Input.Wrapper label="Name">
        <Input value={params.name} />
      </Input.Wrapper>
      <PasswordInput label="Key" value={"test"} disabled={true} />
    </>
  );
}
