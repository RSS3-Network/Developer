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

  const form = useForm({
    initialValues: {
      name: params.name,
    },
  });

  return (
    <>
      <div className="mb-4 flex justify-between border-b pb-2">
        <Title className="!text-2xl font-bold">Overview - {params.name}</Title>
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
      <div className="my-4">
        <Title className="!text-2xl">Settings</Title>
      </div>
      <div className="space-y-4 w-96">
        <form
          className="space-y-2"
          onSubmit={form.onSubmit((values) => console.log(values))}
        >
          <TextInput label="Name" {...form.getInputProps("name")} />
          <Button type="submit">Save</Button>
        </form>
        <div className="space-y-2">
          <PasswordInput
            label="Key"
            value={"test"}
            disabled={true}
            leftSectionPointerEvents="all"
            leftSection={
              <CopyButton value="test">
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
          <Button color="red">Regenerate Key</Button>
        </div>
      </div>
    </>
  );
}
