"use client";

import { Button } from "@tremor/react";
import { LoadingOverlay, Modal, NumberInput } from "@mantine/core";
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
import { useQueryClient } from "@tanstack/react-query";
import HistoryTable from "@/components/HistoryTable";
import {
  useGetHistoryDeposit,
  useGetHistoryCollection,
  useGetHistoryWithdrawal,
  useRequestWithdrawal,
  useGetCurrentWithdrawal,
} from "@/queries/app";

export default function DashboardIndex() {
  const { address } = useAccount();
  const [depositOpened, { open: depositOpen, close: depositClose }] =
    useDisclosure(false);
  const [withdrawOpened, { open: withdrawOpen, close: withdrawClose }] =
    useDisclosure(false);
  const [depositValue, setDepositValue] = useState<string | number>(1000);
  const [withdrawValue, setWithdrawValue] = useState<string | number>(1000);
  const queryClient = useQueryClient();
  const requestWithdrawal = useRequestWithdrawal();
  const currentWithdrawal = useGetCurrentWithdrawal();

  // get billing balance
  const {
    data: billingBalance = 0n,
    refetch: billingRefetch,
    isLoading: billingLoading,
  }: {
    data: bigint | undefined;
    refetch: () => void;
    isLoading: boolean;
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
        queryClient.refetchQueries({
          queryKey: ["historyDeposit"],
        });
      } catch (error: any) {
        toast.error("Deposit failed: ", error);
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
        requestWithdrawal.mutate(+withdrawValue);
        toast.success(
          "Withdrawal request sent, please wait for the end of the current billing cycle, which can take up to 18 hours.",
        );
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
            {billingLoading
              ? "-"
              : (billingBalance / BigInt(tokenTransfers)).toString()}
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
          <Button onClick={withdrawOpen}>
            Withdraw
            {currentWithdrawal.data?.amount
              ? ` (${currentWithdrawal.data.amount} pending)`
              : ""}
          </Button>
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
            Collection Records
          </div>
          <HistoryTable requestFunction={useGetHistoryCollection} />
        </div>
        <div>
          <div className="text-xl font-bold mb-2 border-b pb-2 mt-10">
            Deposit Records
          </div>
          <HistoryTable requestFunction={useGetHistoryDeposit} />
        </div>
        <div>
          <div className="text-xl font-bold mb-2 border-b pb-2 mt-10">
            Withdrawal Records
          </div>
          <HistoryTable requestFunction={useGetHistoryWithdrawal} />
        </div>
      </div>
    </>
  );
}
