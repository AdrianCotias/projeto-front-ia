import type { ProfileService } from "@/domain/user/profile-service";

export function makeGetProfile(profileService: ProfileService) {
  return () => profileService.getProfile();
}
