import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addApp,
  getAppList,
  getApp,
  updateApp,
  deleteApp,
  regenerateApp,
  getAppHistory,
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
