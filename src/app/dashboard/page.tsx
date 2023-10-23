"use client";

import { Card, Title, Button } from "@tremor/react";
import Link from "next/link";
import { useGetAppList } from "@/queries/app";

export default function DashboardIndex() {
  const appList = useGetAppList();

  return (
    <>
      <div className="mb-4 flex justify-between border-b pb-2">
        <Title className="!text-2xl font-bold">RSS3 Apps</Title>
        <Link href={`/dashboard/app`}>
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
      <div className="grid grid-cols-4 gap-4">
        {appList.data?.map((key) => (
          <Link href={`/dashboard/app/${key.id}`} key={key.id}>
            <Card className="flex items-center">{key.name}</Card>
          </Link>
        ))}
      </div>
    </>
  );
}
