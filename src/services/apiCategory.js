import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiClient } from "./aPiConfig";
export const useCategories = (params = {}) => {
  const { data, isPending } = useQuery({
    queryKey: ["categories", params],
    queryFn: () => {
      const searchParams = new URLSearchParams(params).toString();
      const endpoint = searchParams ? `/Category?${searchParams}` : "/Category";
      return apiClient(endpoint);
    },
  });
  const Categories = data?.data;
  const totalNumberOfPages = data?.totalNumberOfPages;
  const totalNumberOfRecords = data?.totalNumberOfRecords;
  return { Categories, isPending, totalNumberOfPages, totalNumberOfRecords };
};
export function useAddCategories() {
  const queryClient = useQueryClient();
  const { isPending: isAdding, mutate: AddCategory } = useMutation({
    mutationFn: (newCategoryData) =>
      apiClient(`/Category`, {
        method: "POST",
        body: JSON.stringify(newCategoryData),
      }),
    onSuccess: (data) => {
      toast.success(data?.message || "Category Added successfully!");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err.message || "Failed to Add Category"
      );
    },
  });
  return { isAdding, AddCategory };
}
export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateCategory } = useMutation({
    mutationFn: ({ id, data }) => {
      return apiClient(`/Category/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Category updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          err.message ||
          "Failed to update category"
      );
    },
  });
  return { isUpdating, updateCategory };
}
export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCategory } = useMutation({
    mutationFn: (id) =>
      apiClient(`/Category/${id}`, {
        method: "DELETE",
      }),
    onSuccess: (data) => {
      toast.success(data?.message || "Category deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          err.message ||
          "Failed to delete Category"
      );
    },
  });
  return { isDeleting, deleteCategory };
}
