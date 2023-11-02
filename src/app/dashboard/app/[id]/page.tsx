"use client";

import {
  AreaChart,
  Title,
  DateRangePicker,
  DateRangePickerValue,
} from "@tremor/react";
import {
  LoadingOverlay,
  PasswordInput,
  TextInput,
  Button,
  CopyButton,
  Tooltip,
  ActionIcon,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import {
  useDeleteApp,
  useGetApp,
  useGetAppHistory,
  useRegenerateApp,
  useUpdateApp,
} from "@/queries/app";
import { useEffect, useState } from "react";

export default function DashboardApp({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const info = useGetApp(params.id);

  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [dateRangeValue, setDateRangeValue] = useState<DateRangePickerValue>({
    from: sevenDaysAgo,
    to: today,
  });

  const form = useForm({
    initialValues: {
      name: info.data?.name,
    },
  });

  useEffect(() => {
    if (!form.values.name) {
      form.setFieldValue("name", info.data?.name);
    }
  }, [info.data?.name]);

  const updateApp = useUpdateApp();
  const regenerateApp = useRegenerateApp();
  const deleteApp = useDeleteApp();

  const appHistory = useGetAppHistory({
    id: params.id,
    ts_from: (dateRangeValue.from || sevenDaysAgo).getTime(),
    ts_to: (dateRangeValue.to || today).getTime(),
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
      <LoadingOverlay visible={info.isLoading} overlayProps={{ blur: 2 }} />
      <div className="space-y-8">
        <div>
          <Title className="!text-2xl font-bold border-b pb-2 mb-4">
            Details - {info.data?.name}
          </Title>
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
              className="max-w-sm"
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
        </div>
        <div>
          <Title className="!text-2xl font-bold border-b pb-2 mb-2">
            Settings
          </Title>
          <div className="space-y-4">
            <form
              className="space-y-2"
              onSubmit={form.onSubmit((values) =>
                updateApp.mutate({
                  id: params.id,
                  name: values.name,
                }),
              )}
            >
              <TextInput
                label="Name"
                {...form.getInputProps("name")}
                className="w-96"
              />
              <Button type="submit" loading={updateApp.isPending}>
                Save
              </Button>
            </form>
            <div className="space-y-2">
              <PasswordInput
                className="w-96"
                label="Key"
                value={info.data?.key}
                disabled={true}
                leftSectionPointerEvents="all"
                leftSection={
                  <CopyButton value={info.data?.key || ""}>
                    {({ copied, copy }) => (
                      <Tooltip
                        label={copied ? "Copied" : "Copy"}
                        withArrow
                        position="right"
                      >
                        <ActionIcon
                          color={copied ? "teal" : "gray"}
                          variant="subtle"
                          onClick={copy}
                        >
                          {copied ? (
                            <IconCheck style={{ width: rem(16) }} />
                          ) : (
                            <IconCopy style={{ width: rem(16) }} />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                }
              />
              <Button
                color="red"
                onClick={() => regenerateApp.mutate(params.id)}
                loading={regenerateApp.isPending}
              >
                Regenerate Key
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Title className="!text-2xl font-bold border-b pb-2 mb-2">
            Delete
          </Title>
          <div className="space-y-2">
            <p className="text-gray-500 text-sm">
              Once you delete your app, there is no way to undo it. Please make
              sure you are certain before proceeding.
            </p>
            <Button
              color="red"
              onClick={() => deleteApp.mutate(params.id)}
              loading={deleteApp.isPending}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
