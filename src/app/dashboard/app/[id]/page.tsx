"use client";

import { AreaChart, Title, DateRangePicker } from "@tremor/react";
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
  useRegenerateApp,
  useUpdateApp,
} from "@/queries/app";
import { useEffect } from "react";

const chartdata = [
  {
    date: "Jan 22",
    requests: 2890,
    ru: 2890 * 1.2,
  },
  {
    date: "Feb 22",
    requests: 2756,
    ru: 2756 * 1,
  },
  {
    date: "Mar 22",
    requests: 3322,
    ru: 3322 * 0.8,
  },
  {
    date: "Apr 22",
    requests: 3470,
    ru: 3470 * 1.1,
  },
  {
    date: "May 22",
    requests: 3475,
    ru: 3475 * 1.2,
  },
  {
    date: "Jun 22",
    requests: 3129,
    ru: 3129 * 1,
  },
];

export default function DashboardApp({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const info = useGetApp(params.id);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

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
                <Title className="!text-2xl font-medium">21432</Title>
              </div>
              <div>
                <div className="flex items-center">
                  <Title className="!text-base">RU</Title>
                  <Tooltip label="The RSS3 Unit is a computing unit that is directly used for billing.">
                    <i className="icon-[mingcute--question-line] ml-1 text-sm text-zinc-600" />
                  </Tooltip>
                </div>
                <Title className="!text-2xl font-medium">2143</Title>
              </div>
            </div>
            <DateRangePicker
              className="max-w-sm"
              defaultValue={{
                from: sevenDaysAgo,
                to: today,
              }}
            />
          </div>
          <AreaChart
            className="h-72 mt-4"
            data={chartdata}
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
