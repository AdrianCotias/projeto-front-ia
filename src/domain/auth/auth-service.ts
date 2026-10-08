import type { Credentials, Session } from "./session";

export interface AuthService {
  login(credentials: Credentials): Promise<Session>;
  logout(): Promise<void>;
}
