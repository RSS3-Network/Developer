import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addApp, getAppList } from "@/models/app";

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
