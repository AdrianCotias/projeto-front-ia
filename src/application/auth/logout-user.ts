import type { AuthService } from "@/domain/auth/auth-service";
import { sessionStorageToken } from "@/lib/session-storage";

export function makeLogoutUser(authService: AuthService) {
  return async function logoutUser(): Promise<void> {
    try {
      await authService.logout();
    } finally {
      sessionStorageToken.clear();
    }
  };
}
