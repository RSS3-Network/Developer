"use client";

import { Title, Button } from "@tremor/react";
import Link from "next/link";
import { useGetAppList } from "@/queries/app";
import { LoadingOverlay } from "@mantine/core";

export default function DashboardIndex() {
  const appList = useGetAppList();

  return (
    <>
      <div className="mb-4 flex justify-between border-b pb-2">
        <Title className="!text-2xl font-bold">RSS3 Apps</Title>
        <Link href={`/new`}>
          <Button
            size="xs"
            className="ml-4"
            icon={() => (
              <i className="icon-[mingcute--add-circle-line] mr-1 text-xl" />
            )}
          >
            New RSS3 App
          </Button>
        </Link>
      </div>
      <div className="relative min-h-[100px]">
        <LoadingOverlay
          visible={appList.isLoading}
          overlayProps={{ blur: 2 }}
        />
        <div className="grid grid-cols-4 gap-4">
          {appList.data?.map?.((key) => (
            <Link href={`/app/${key.id}`} key={key.id}>
              <div className="flex items-center p-6 rounded-lg bg-blue-50">
                {key.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
