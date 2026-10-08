import { beforeEach, describe, expect, it } from "vitest";
import { makeLoginUser } from "@/application/auth/login-user";
import { restAuthService } from "@/infrastructure/auth/rest-auth-service";
import { sessionStorageToken } from "@/lib/session-storage";

describe("LoginUser", () => {
  beforeEach(() => sessionStorageToken.clear());

  it("autentica e guarda o token", async () => {
    const session = await makeLoginUser(restAuthService)({ email: "ada@nft.test", password: "123456" });
    expect(session.user.name).toBe("Ada Collector");
    expect(sessionStorageToken.get()).toBe("mock-token");
  });

  it("rejeita credenciais inválidas sem guardar token", async () => {
    await expect(
      makeLoginUser(restAuthService)({ email: "ada@nft.test", password: "errada1" }),
    ).rejects.toThrow();
    expect(sessionStorageToken.get()).toBeNull();
  });
});
