import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiClient } from "./aPiConfig";
export const useRecipes = (params = {}) => {
  const { data, isPending } = useQuery({
    queryKey: ["Recipes", params],
    queryFn: () => {
      const searchParams = new URLSearchParams(params).toString();
      const endpoint = searchParams ? `/Recipe?${searchParams}` : "/Recipe";
      return apiClient(endpoint);
    },
  });
  const Recipes = data?.data;
  const totalNumberOfPages = data?.totalNumberOfPages;
  return { Recipes, isPending, totalNumberOfPages };
};
export function useAddRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) =>
      apiClient("/Recipe", {
        method: "POST",
        body: formData,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Recipes"] });
    },
  });
}
export function useUpdateRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ recipeId, formData }) =>
      apiClient(`/Recipe/${recipeId}`, {
        method: "PUT",
        body: formData,
      }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Recipes"] });
      queryClient.invalidateQueries({
        queryKey: ["RecipesId", variables.recipeId],
      });
    },
  });
}
export function useRecipeById(recipeId) {
  return useQuery({
    queryKey: ["RecipesId", recipeId],
    queryFn: () => apiClient(`/Recipe/${recipeId}`),
    enabled: !!recipeId,
  });
}
export function useDeleteRecipe() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteRecipe } = useMutation({
    mutationFn: (id) =>
      apiClient(`/Recipe/${id}`, {
        method: "DELETE",
      }),
    onSuccess: (data) => {
      toast.success(data?.message || "Recipe deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["Recipes"],
      });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err.message || "Failed to delete Recipe"
      );
    },
  });
  return { isDeleting, deleteRecipe };
}
export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => apiClient("/tag/"),
  });
}
