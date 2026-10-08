import type { AuthService } from "@/domain/auth/auth-service";
import type { Credentials, Session } from "@/domain/auth/session";
import { sessionStorageToken } from "@/lib/session-storage";

export function makeLoginUser(authService: AuthService) {
  return async function loginUser(credentials: Credentials): Promise<Session> {
    const session = await authService.login(credentials);
    sessionStorageToken.set(session.token);
    return session;
  };
}
