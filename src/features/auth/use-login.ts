"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "./auth-services";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (session) => queryClient.setQueryData(["session"], session.user),
  });
}
