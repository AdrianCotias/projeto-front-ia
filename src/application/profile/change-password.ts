import type { ChangePasswordInput } from "@/domain/user/profile";
import type { ProfileService } from "@/domain/user/profile-service";

export class PasswordMismatchError extends Error {
  constructor() {
    super("A confirmação não confere com a nova senha");
  }
}

export class WeakPasswordError extends Error {
  constructor() {
    super("A nova senha precisa ter ao menos 6 caracteres");
  }
}

export function makeChangePassword(profileService: ProfileService) {
  return async function changePassword(input: ChangePasswordInput): Promise<void> {
    if (input.newPassword.length < 6) throw new WeakPasswordError();
    if (input.newPassword !== input.confirmPassword) throw new PasswordMismatchError();
    await profileService.changePassword({
      currentPassword: input.currentPassword,
      newPassword: input.newPassword,
    });
  };
}
