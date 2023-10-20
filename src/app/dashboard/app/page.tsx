"use client";

import { Title } from "@tremor/react";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAddApp } from "@/queries/app";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardApp() {
  const form = useForm({
    initialValues: {
      name: "",
    },
  });
  const addApp = useAddApp();
  const router = useRouter();

  useEffect(() => {
    if (addApp.isSuccess) {
      router.push(`/dashboard/app/${addApp.data.name}`);
    }
  }, [addApp.isSuccess]);

  return (
    <>
      <div className="mb-4 flex justify-between border-b pb-2">
        <Title className="!text-2xl font-bold">New RSS3 App</Title>
      </div>
      <div className="space-y-4 w-96">
        <form
          className="space-y-2"
          onSubmit={form.onSubmit((values) =>
            addApp.mutate({
              name: values.name,
            }),
          )}
        >
          <TextInput label="Name" {...form.getInputProps("name")} />
          <Button type="submit">Add</Button>
        </form>
      </div>
    </>
  );
}
