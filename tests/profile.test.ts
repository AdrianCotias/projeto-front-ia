import { beforeEach, describe, expect, it } from "vitest";
import { PasswordMismatchError, WeakPasswordError } from "@/application/profile/change-password";
import { restProfileService } from "@/infrastructure/profile/rest-profile-service";
import { makeChangePassword } from "@/application/profile/change-password";
import { makeGetProfile } from "@/application/profile/get-profile";
import { makeUpdateProfile } from "@/application/profile/update-profile";
import { sessionStorageToken } from "@/lib/session-storage";

const getProfile = makeGetProfile(restProfileService);
const updateProfile = makeUpdateProfile(restProfileService);
const changePassword = makeChangePassword(restProfileService);

describe("perfil do colecionador", () => {
  beforeEach(() => sessionStorageToken.set("mock-token"));

  it("carrega o perfil", async () => {
    const profile = await getProfile();
    expect(profile).toMatchObject({ displayName: "Ada Collector", ensSuffix: ".eth", avatarUrl: null });
  });

  it("salva os dados normalizando o usuário", async () => {
    const current = await getProfile();
    const saved = await updateProfile({ ...current, displayName: "  Ada L.  ", username: "@ada_l" });
    expect(saved.displayName).toBe("Ada L.");
    expect(saved.username).toBe("ada_l");
    expect((await getProfile()).username).toBe("ada_l");
  });

  it("rejeita acesso sem token", async () => {
    sessionStorageToken.clear();
    await expect(getProfile()).rejects.toThrow();
  });

  it("troca a senha", async () => {
    await expect(
      changePassword({ currentPassword: "123456", newPassword: "abcdef", confirmPassword: "abcdef" }),
    ).resolves.toBeUndefined();
  });

  it("valida confirmação e tamanho da nova senha", async () => {
    await expect(
      changePassword({ currentPassword: "123456", newPassword: "abcdef", confirmPassword: "outra1" }),
    ).rejects.toBeInstanceOf(PasswordMismatchError);
    await expect(
      changePassword({ currentPassword: "123456", newPassword: "abc", confirmPassword: "abc" }),
    ).rejects.toBeInstanceOf(WeakPasswordError);
  });

  it("rejeita senha atual incorreta", async () => {
    await expect(
      changePassword({ currentPassword: "errada", newPassword: "abcdef", confirmPassword: "abcdef" }),
    ).rejects.toThrow();
  });
});
