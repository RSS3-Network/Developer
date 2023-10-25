"use client";

import { Button } from "@tremor/react";
import { LoadingOverlay } from "@mantine/core";
import { Table } from "@mantine/core";

export default function DashboardIndex() {
  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <div className="text-2xl font-bold mb-4 border-b pb-2">Billing</div>
      <div className="relative min-h-[100px] space-y-6">
        <LoadingOverlay visible={false} overlayProps={{ blur: 2 }} />
        <div>
          <div className="text-base text-zinc-600">$RSS3 Balance</div>
          <div className="text-2xl font-bold">1000</div>
        </div>
        <div className="space-x-4">
          <Button>Deposit</Button>
          <Button>Withdrawal</Button>
        </div>
        <div>
          <div className="text-xl font-bold mb-2 border-b pb-2 mt-10">
            Expense records
          </div>
          <Table verticalSpacing="md" striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Time</Table.Th>
                <Table.Th>Amount</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
