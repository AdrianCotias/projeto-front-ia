import { makeChangePassword } from "@/application/profile/change-password";
import { makeGetProfile } from "@/application/profile/get-profile";
import { makeUpdateProfile } from "@/application/profile/update-profile";
import { restProfileService } from "@/infrastructure/profile/rest-profile-service";

export const getProfile = makeGetProfile(restProfileService);
export const updateProfile = makeUpdateProfile(restProfileService);
export const changePassword = makeChangePassword(restProfileService);
