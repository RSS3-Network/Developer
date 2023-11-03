"use client";

import { Title } from "@tremor/react";
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
import HistoryChart from "@/components/HistoryChart";

export default function DashboardApp({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const info = useGetApp(params.id);

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
          <HistoryChart id={params.id} />
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
