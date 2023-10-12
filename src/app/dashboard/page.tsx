"use client";

import { Card, Title, Button } from "@tremor/react";

export default function DashboardExample() {
  const keys = [
    {
      name: "Mammals",
    },
    {
      name: "Birds",
    },
    {
      name: "Reptiles",
    },
    {
      name: "Amphibians",
    },
    {
      name: "Fishes",
    },
    {
      name: "Invertebrates",
    },
  ];
  return (
    <>
      <div className="mb-4 flex justify-between border-b pb-2">
        <Title className="!text-2xl">RSS3 Apps</Title>
        <Button
          size="xs"
          className="ml-4"
          icon={() => (
            <i className="icon-[mingcute--add-circle-line] mr-1 text-xl" />
          )}
        >
          New RSS3 App
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {keys.map((key) => (
          <Card className="flex items-center" key={key.name}>
            {key.name}
          </Card>
        ))}
      </div>
    </>
  );
}
