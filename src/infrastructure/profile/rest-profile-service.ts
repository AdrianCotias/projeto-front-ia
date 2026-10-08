import {
  profileDto,
  type ChangePasswordRequestDto,
  type ProfileDto,
  type UpdateProfileRequestDto,
} from "@/contracts/profile";
import type { Profile } from "@/domain/user/profile";
import type { ProfileService } from "@/domain/user/profile-service";
import { httpClient } from "../http/http-client";

function toProfile(dto: ProfileDto): Profile {
  return {
    id: dto.id,
    displayName: dto.display_name,
    username: dto.username,
    email: dto.email,
    ensName: dto.ens_name,
    ensSuffix: dto.ens_suffix,
    walletNickname: dto.wallet_nickname,
    avatarUrl: dto.avatar_url,
  };
}

export const restProfileService: ProfileService = {
  async getProfile() {
    const { data } = await httpClient.get("/profile");
    return toProfile(profileDto.parse(data));
  },
  async updateProfile(input) {
    const body: UpdateProfileRequestDto = {
      display_name: input.displayName,
      username: input.username,
      email: input.email,
      ens_name: input.ensName,
      ens_suffix: input.ensSuffix,
      wallet_nickname: input.walletNickname,
      avatar_url: input.avatarUrl,
    };
    const { data } = await httpClient.put("/profile", body);
    return toProfile(profileDto.parse(data));
  },
  async changePassword(input) {
    const body: ChangePasswordRequestDto = {
      current_password: input.currentPassword,
      new_password: input.newPassword,
    };
    await httpClient.put("/profile/password", body);
  },
};
