"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changePassword, getProfile, updateProfile } from "./profile-services";

const PROFILE_KEY = ["profile"];

export function useProfile() {
  return useQuery({ queryKey: PROFILE_KEY, queryFn: getProfile, retry: false });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (profile) => queryClient.setQueryData(PROFILE_KEY, profile),
  });
}

export function useChangePassword() {
  return useMutation({ mutationFn: changePassword });
}
