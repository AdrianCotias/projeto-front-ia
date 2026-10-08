import { z } from "zod";

export const profileDto = z.object({
  id: z.string(),
  display_name: z.string(),
  username: z.string(),
  email: z.string().email(),
  ens_name: z.string(),
  ens_suffix: z.enum([".eth", ".crypto", ".nft"]),
  wallet_nickname: z.string(),
  avatar_url: z.string().nullable(),
});

export const updateProfileRequestDto = profileDto.omit({ id: true });

export const changePasswordRequestDto = z.object({
  current_password: z.string().min(1),
  new_password: z.string().min(6),
});

export type ProfileDto = z.infer<typeof profileDto>;
export type UpdateProfileRequestDto = z.infer<typeof updateProfileRequestDto>;
export type ChangePasswordRequestDto = z.infer<typeof changePasswordRequestDto>;
