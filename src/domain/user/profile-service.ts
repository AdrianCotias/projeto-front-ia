import type { ChangePasswordInput, Profile, UpdateProfileInput } from "./profile";

export interface ProfileService {
  getProfile(): Promise<Profile>;
  updateProfile(input: UpdateProfileInput): Promise<Profile>;
  changePassword(input: Pick<ChangePasswordInput, "currentPassword" | "newPassword">): Promise<void>;
}
