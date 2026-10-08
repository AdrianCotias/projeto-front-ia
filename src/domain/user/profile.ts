export const ENS_SUFFIXES = [".eth", ".crypto", ".nft"] as const;
export type EnsSuffix = (typeof ENS_SUFFIXES)[number];

export interface Profile {
  id: string;
  displayName: string;
  username: string;
  email: string;
  ensName: string;
  ensSuffix: EnsSuffix;
  walletNickname: string;
  avatarUrl: string | null;
}

export type UpdateProfileInput = Omit<Profile, "id">;

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
