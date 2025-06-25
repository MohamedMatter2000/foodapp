import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiClient } from "./aPiConfig";
export const useCurrentUser = () => {
  const {
    data: userData,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => apiClient("/Users/currentUser"),
    enabled: !!localStorage.getItem("token"),
  });
  return { userData, isPending, isSuccess };
};
export const useUsers = (params = {}) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => {
      const searchParams = new URLSearchParams(params).toString();
      const endpoint = searchParams ? `/Users?${searchParams}` : "/Users";
      return apiClient(endpoint);
    },
  });
};
// Get user by ID
// export const useUser = (id) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.USER, id],
//     queryFn: () => apiClient(`/Users/${id}`),
//     enabled: !!id,
//   });
// };
// Login mutation
export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: Updateuser } = useMutation({
    mutationFn: (userData) =>
      apiClient("/Users", {
        method: "PUT",
        body: userData,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  return { isUpdating, Updateuser };
};
export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: (id) =>
      apiClient(`/Users/${id}`, {
        method: "DELETE",
      }),
    onSuccess: (data) => {
      toast.success(data?.message || "User deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err.message || "Failed to delete user"
      );
    },
  });
  return { isDeleting, deleteUser };
}
