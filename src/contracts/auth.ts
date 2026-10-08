import { z } from "zod";

export const userDto = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar_url: z.string().url().optional(),
});

export const loginRequestDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginResponseDto = z.object({
  token: z.string(),
  user: userDto,
});

export type UserDto = z.infer<typeof userDto>;
export type LoginRequestDto = z.infer<typeof loginRequestDto>;
export type LoginResponseDto = z.infer<typeof loginResponseDto>;
