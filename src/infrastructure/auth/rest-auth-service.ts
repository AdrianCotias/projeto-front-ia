import { loginResponseDto } from "@/contracts/auth";
import type { AuthService } from "@/domain/auth/auth-service";
import type { Credentials, Session } from "@/domain/auth/session";
import { httpClient } from "../http/http-client";

export const restAuthService: AuthService = {
  async login(credentials: Credentials): Promise<Session> {
    const { data } = await httpClient.post("/auth/login", credentials);
    const dto = loginResponseDto.parse(data);
    return {
      token: dto.token,
      user: {
        id: dto.user.id,
        name: dto.user.name,
        email: dto.user.email,
        avatarUrl: dto.user.avatar_url,
      },
    };
  },
  async logout() {
    await httpClient.post("/auth/logout");
  },
};
