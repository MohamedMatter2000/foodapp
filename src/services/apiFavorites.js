import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useFoodApp } from "../context/AppFoodProvider";
import { apiClient } from "./aPiconfig";

export function useFavorites() {
  const { usergroup } = useFoodApp();
  const { data, isPending } = useQuery({
    queryKey: ["Favorites"],
    queryFn: () => {
      return apiClient("/userRecipe");
    },
    enabled: usergroup === "SystemUser",
  });
  const dataFavorite = data?.data;
  return { dataFavorite, isPending };
}
export function useAddFavorites() {
  const queryClient = useQueryClient();
  const {
    mutate: AddFavorites,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (recipeId) => {
      return apiClient("/userRecipe", {
        method: "POST",
        data: { recipeId },
        body: JSON.stringify({ recipeId }),
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
