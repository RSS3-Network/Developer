"use client";

import { LoadingOverlay, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import type {
  useGetHistoryDeposit,
  useGetHistoryWithdrawal,
  useGetHistoryCollection,
} from "@/queries/app";
import Link from "next/link";
import { TESTNET } from "@/lib/env";
import { Pagination } from "@mantine/core";

export default function HistoryTable({
  requestFunction,
}: {
  requestFunction:
    | typeof useGetHistoryDeposit
    | typeof useGetHistoryCollection
    | typeof useGetHistoryWithdrawal;
}) {
  const [activePage, setActivePage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [rows, setRows] = useState<React.ReactNode[]>([]);

  const historyDeposit = requestFunction({
    page: activePage,
    limit: 5,
  });

  useEffect(() => {
    if (!maxPage && historyDeposit?.data?.page_max) {
      setMaxPage(historyDeposit.data.page_max);
    }
  }, [historyDeposit?.data?.page_max, maxPage]);

  useEffect(() => {
    if (historyDeposit.data?.list) {
      setRows(
        historyDeposit.data.list.map((deposit) => (
          <Table.Tr key={deposit.index}>
            <Table.Td>
              {new Date(deposit.block_timestamp).toLocaleString()}
            </Table.Td>
            <Table.Td>{deposit.amount}</Table.Td>
            <Table.Td>
              <Link
                href={`https://${TESTNET ? "sepolia." : ""}etherscan.io/tx/${
                  deposit.tx_hash
                }`}
                className="underline"
                target="_blank"
              >
                {deposit.tx_hash.slice(0, 7)}...{deposit.tx_hash.slice(-5)}
              </Link>
            </Table.Td>
          </Table.Tr>
        )),
      );
    }
  }, [historyDeposit.data?.list]);

  return (
    <>
      <div className="relative">
        <LoadingOverlay
          visible={historyDeposit.isLoading}
          overlayProps={{ blur: 2 }}
        />
        {rows.length ? (
          <Table verticalSpacing="md" striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Time</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Transaction</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        ) : (
          <div className="min-h-[50px]">No Data</div>
        )}
      </div>
      {maxPage > 1 && (
        <Pagination
          className="mt-4"
          total={maxPage || 1}
          value={activePage}
          onChange={setActivePage}
        />
      )}
    </>
  );
}
