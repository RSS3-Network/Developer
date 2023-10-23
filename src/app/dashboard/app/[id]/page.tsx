"use client";

import { AreaChart, Title, DateRangePicker } from "@tremor/react";
import {
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
      <div className="mb-4 flex justify-between border-b pb-2">
        <Title className="!text-2xl font-bold">
          Overview - {info.data?.name}
        </Title>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div>
            <Title className="!text-base">Requests</Title>
            <Title className="!text-2xl font-medium">238243</Title>
          </div>
          <div>
            <Title className="!text-base">Requests</Title>
            <Title className="!text-2xl font-medium">238243</Title>
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
        categories={["SemiAnalysis"]}
        colors={["blue"]}
      />
      <div className="mb-2 mt-8">
        <Title className="!text-2xl font-semibold">Settings</Title>
      </div>
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
      <div className="mb-2 mt-8">
        <Title className="!text-2xl font-semibold">Delete</Title>
      </div>
      <div className="space-y-2">
        <p className="text-gray-500 text-sm">
          Once you delete your app, there is no way to undo it. Please make sure
          you are certain before proceeding.
        </p>
        <Button
          color="red"
          onClick={() => deleteApp.mutate(params.id)}
          loading={deleteApp.isPending}
        >
          Delete
        </Button>
      </div>
    </>
  );
}
