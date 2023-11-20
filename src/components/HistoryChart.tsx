"use client";

import {
  AreaChart,
  Title,
  DateRangePicker,
  DateRangePickerValue,
} from "@tremor/react";
import { Tooltip } from "@mantine/core";
import { useGetAppHistory } from "@/queries/app";
import { useEffect, useState } from "react";

export default function HistoryChart({ id }: { id?: string }) {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [dateRangeValue, setDateRangeValue] = useState<DateRangePickerValue>({
    from: sevenDaysAgo,
    to: today,
  });

  const appHistory = useGetAppHistory({
    id,
    since: (dateRangeValue.from || sevenDaysAgo).getTime(),
    until: (dateRangeValue.to || today).getTime(),
  });

  const [chartData, setChartData] = useState<
    {
      date: string;
      requests: number;
      ru: number;
    }[]
  >([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalRu, setTotalRu] = useState(0);
  useEffect(() => {
    if (appHistory.data) {
      setChartData(
        appHistory.data
          .map((item) => ({
            date: new Date(item.collected_at).toLocaleDateString(),
            requests: item.api_calls,
            ru: item.ru_used,
          }))
          .reverse(),
      );
      setTotalRequests(
        appHistory.data.reduce((acc, item) => acc + item.api_calls, 0),
      );
      setTotalRu(appHistory.data.reduce((acc, item) => acc + item.ru_used, 0));
    }
  }, [appHistory.data]);

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div>
            <Title className="!text-base">Requests</Title>
            <Title className="!text-2xl font-medium">{totalRequests}</Title>
          </div>
          <div>
            <div className="flex items-center">
              <Title className="!text-base">RU</Title>
              <Tooltip label="The RSS3 Unit is a computing unit that is directly used for billing.">
                <i className="icon-[mingcute--question-line] ml-1 text-sm text-zinc-600" />
              </Tooltip>
            </div>
            <Title className="!text-2xl font-medium">{totalRu}</Title>
          </div>
        </div>
        <DateRangePicker
          className="max-w-sm [&_button]:bg-transparent"
          value={dateRangeValue}
          onValueChange={setDateRangeValue}
        />
      </div>
      <AreaChart
        className="h-72 mt-4"
        data={chartData}
        index="date"
        categories={["requests", "ru"]}
        colors={["blue", "cyan"]}
      />
    </>
  );
}
