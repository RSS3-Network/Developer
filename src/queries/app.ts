import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addApp,
  getAppList,
  getApp,
  updateApp,
  deleteApp,
  regenerateApp,
  getAppHistory,
  getHistoryDeposit,
  getHistoryCollection,
  getHistoryWithdrawal,
  requestWithdrawal,
  getCurrentWithdrawal,
} from "@/models/app";

export function useAddApp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Parameters<typeof addApp>[0]) => {
      return addApp(input);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["appList"],
      });
    },
  });
}

export const useGetAppList = () => {
  return useQuery({
    queryKey: ["appList"],
    queryFn: async () => {
      return getAppList();
    },
  });
};

export const useGetApp = (id: string) => {
  return useQuery({
    queryKey: ["app", id],
    queryFn: async () => {
      return getApp(id);
    },
  });
};

export function useUpdateApp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Parameters<typeof updateApp>[0]) => {
      return updateApp(input);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["appList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["app", variables.id],
      });
    },
  });
}

export function useDeleteApp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return deleteApp(id);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["appList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["app", variables],
      });
    },
  });
}

export function useRegenerateApp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return regenerateApp(id);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["app", variables],
      });
    },
  });
}

export const useGetAppHistory = (
  input: Parameters<typeof getAppHistory>[0],
) => {
  return useQuery({
    queryKey: ["appHistory", input.id, input],
    queryFn: async () => {
      return getAppHistory(input);
    },
  });
};

export const useGetHistoryDeposit = (
  input: Parameters<typeof getHistoryDeposit>[0],
) => {
  return useQuery({
    queryKey: ["historyDeposit", input],
    queryFn: async () => {
      return getHistoryDeposit(input);
    },
  });
};

export const useGetHistoryCollection = (
  input: Parameters<typeof getHistoryCollection>[0],
) => {
  return useQuery({
    queryKey: ["historyCollection", input],
    queryFn: async () => {
      return getHistoryCollection(input);
    },
  });
};

export const useGetHistoryWithdrawal = (
  input: Parameters<typeof getHistoryWithdrawal>[0],
) => {
  return useQuery({
    queryKey: ["historyWithdrawal", input],
    queryFn: async () => {
      return getHistoryWithdrawal(input);
    },
  });
};

export function useRequestWithdrawal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (amount: number) => {
      return requestWithdrawal(amount);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["currentWithdrawal"],
      });
    },
  });
}

export const useGetCurrentWithdrawal = () => {
  return useQuery({
    queryKey: ["currentWithdrawal"],
    queryFn: async () => {
      return getCurrentWithdrawal();
    },
  });
};
