import type { User } from "../user/user";

export interface Session {
  token: string;
  user: User;
}

export interface Credentials {
  email: string;
  password: string;
}
