import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./aPiConfig";
export function useFavorites() {
  const { data, isPaused } = useQuery({
    queryKey: ["Favorites"],
    queryFn: () => {
      return apiClient("/userRecipe");
    },
  });
  return { data, isPaused };
}
export function useAddFavorites() {
  const queryClient = useQueryClient();
  const {
    mutate: AddFavorites,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => {
      return apiClient("/userRecipe", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Favorites"],
      });
    },
  });
  return { AddFavorites, isPending, isSuccess };
}
export function useDeleteFavorites() {
  const queryClient = useQueryClient();
  const {
    mutate: DeleteFavorites,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (id) => {
      return apiClient(`/userRecipe/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Favorites"],
      });
    },
  });
  return { DeleteFavorites, isPending, isSuccess };
}
