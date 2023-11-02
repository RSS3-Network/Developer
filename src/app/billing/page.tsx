"use client";

import { Button } from "@tremor/react";
import { LoadingOverlay, Modal, Table, NumberInput } from "@mantine/core";
import { useContractRead, useAccount } from "wagmi";
import {
  billingABI,
  billingContract,
  tokenTransfers,
  tokenABI,
  tokenContract,
} from "@/lib/const";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import toast from "react-hot-toast";
import { writeContract, waitForTransaction } from "wagmi/actions";

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
  const { address } = useAccount();
  const [depositOpened, { open: depositOpen, close: depositClose }] =
    useDisclosure(false);
  const [withdrawOpened, { open: withdrawOpen, close: withdrawClose }] =
    useDisclosure(false);
  const [depositValue, setDepositValue] = useState<string | number>(1000);
  const [withdrawValue, setWithdrawValue] = useState<string | number>(1000);

  // get billing balance
  const {
    data: billingBalance = 0n,
    refetch: billingRefetch,
  }: {
    data: bigint | undefined;
    refetch: () => void;
  } = useContractRead({
    address: billingContract,
    abi: billingABI,
    functionName: "balanceOf",
    args: [address],
  });

  // get token balance
  const {
    data: tokenBalance = 0n,
  }: {
    data: bigint | undefined;
  } = useContractRead({
    address: tokenContract,
    abi: tokenABI,
    functionName: "balanceOf",
    args: [address],
  });

  // get allowance
  const {
    data: allowanceData = 0n,
  }: {
    data: bigint | undefined;
  } = useContractRead({
    address: tokenContract,
    abi: tokenABI,
    functionName: "allowance",
    args: [address, billingContract],
  });

  // deposit
  const [depositLoading, setDepositLoading] = useState(false);
  const deposit = async () => {
    setDepositLoading(true);
    const realValue = BigInt(depositValue) * BigInt(tokenTransfers);

    if (realValue > tokenBalance) {
      toast.error(
        "Deposit failed: Please ensure that you have enough RSS3 tokens in your account before proceeding.",
      );
    } else {
      try {
        if (allowanceData < realValue) {
          const { hash } = await writeContract({
            address: tokenContract,
            abi: tokenABI,
            functionName: "approve",
            args: [billingContract, realValue],
          });
          await waitForTransaction({
            hash,
          });
        }
        const { hash } = await writeContract({
          address: billingContract,
          abi: billingABI,
          functionName: "deposit",
          args: [BigInt(depositValue) * BigInt(tokenTransfers)],
        });
        await waitForTransaction({
          hash,
        });
        billingRefetch();
      } catch (error: any) {
        toast.error("Deposit failed: ", error?.message);
      }
    }
    depositClose();
    setDepositLoading(false);
  };

  // withdraw
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const withdraw = async () => {
    setWithdrawLoading(true);
    const realValue = BigInt(withdrawValue) * BigInt(tokenTransfers);

    if (realValue > billingBalance) {
      toast.error(
        "Withdraw failed: Please ensure that you have enough RSS3 tokens in your balance before proceeding.",
      );
    } else {
      try {
        const { hash } = await writeContract({
          address: billingContract,
          abi: billingABI,
          functionName: "withdraw",
          args: [BigInt(withdrawValue) * BigInt(tokenTransfers)],
        });
        await waitForTransaction({
          hash,
        });
        billingRefetch();
      } catch (error: any) {
        toast.error("Withdraw failed: ", error);
      }
    }
    withdrawClose();
    setWithdrawLoading(false);
  };

  return (
    <>
      <div className="text-2xl font-bold mb-4 border-b pb-2">Billing</div>
      <div className="relative min-h-[100px] space-y-6">
        <LoadingOverlay visible={false} overlayProps={{ blur: 2 }} />
        <div>
          <div className="text-base text-zinc-600">$RSS3 Balance</div>
          <div className="text-2xl font-bold">
            {(billingBalance / BigInt(tokenTransfers)).toString()}
          </div>
        </div>
        <div className="space-x-4">
          <Button onClick={depositOpen}>Deposit</Button>
          <Modal
            opened={depositOpened}
            onClose={depositClose}
            title="Deposit"
            centered
          >
            <NumberInput
              label="Amount"
              value={depositValue}
              onChange={setDepositValue}
            />
            <Button
              className="mt-4"
              loading={depositLoading}
              onClick={() => deposit()}
            >
              Confirm
            </Button>
          </Modal>
          <Button onClick={withdrawOpen}>Withdraw</Button>
          <Modal
            opened={withdrawOpened}
            onClose={withdrawClose}
            title="Withdraw"
            centered
          >
            <NumberInput
              label="Amount"
              value={withdrawValue}
              onChange={setWithdrawValue}
            />
            <Button
              className="mt-4"
              loading={withdrawLoading}
              onClick={() => withdraw()}
            >
              Confirm
            </Button>
          </Modal>
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
