import type { Profile, UpdateProfileInput } from "@/domain/user/profile";
import type { ProfileService } from "@/domain/user/profile-service";

export function makeUpdateProfile(profileService: ProfileService) {
  return async function updateProfile(input: UpdateProfileInput): Promise<Profile> {
    return profileService.updateProfile({
      ...input,
      displayName: input.displayName.trim(),
      username: input.username.trim().replace(/^@/, ""),
      email: input.email.trim(),
      ensName: input.ensName.trim(),
      walletNickname: input.walletNickname.trim(),
    });
  };
}
