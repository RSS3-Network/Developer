import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addApp } from "@/models/app";

export function useAddApp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Parameters<typeof addApp>[0]) => {
      return addApp(input);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [],
      });
    },
  });
}
