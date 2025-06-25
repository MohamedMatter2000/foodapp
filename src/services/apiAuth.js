import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./aPiConfig";
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials) =>
      apiClient("/Users/Login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};
export const useRegister = () => {
  return useMutation({
    mutationFn: (userData) =>
      apiClient("/Users/Register", {
        method: "POST",
        body: JSON.stringify(userData),
      }),
  });
};
export const useForgetPassword = () => {
  return useMutation({
    mutationFn: (email) =>
      apiClient("/Users/Reset/Request", {
        method: "POST",
        body: JSON.stringify(email),
      }),
  });
};
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (resetData) =>
      apiClient("/Users/Reset", {
        method: "POST",
        body: JSON.stringify(resetData),
      }),
  });
};
export const useVerifyAccount = () => {
  return useMutation({
    mutationFn: (verificationData) =>
      apiClient("/Users/verify", {
        method: "POST",
        body: JSON.stringify(verificationData),
      }),
  });
};
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (passwordData) =>
      apiClient("/Users/ChangePassword", {
        method: "PUT",
        body: JSON.stringify(passwordData),
      }),
  });
};
