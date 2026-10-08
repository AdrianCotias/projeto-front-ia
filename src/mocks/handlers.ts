import { http, HttpResponse } from "msw";
import type { ProfileDto } from "@/contracts/profile";

const initialProfile: ProfileDto = {
  id: "u_1",
  display_name: "Ada Collector",
  username: "ada",
  email: "ada@nft.test",
  ens_name: "ada",
  ens_suffix: ".eth",
  wallet_nickname: "Carteira principal",
  avatar_url: null,
};

const TOKEN = "mock-token";

let profile: ProfileDto = { ...initialProfile };
let password = "123456";

export function resetMockDb() {
  profile = { ...initialProfile };
  password = "123456";
}

const unauthorized = () => HttpResponse.json({ message: "Não autenticado" }, { status: 401 });
const isAuthed = (request: Request) => request.headers.get("Authorization") === `Bearer ${TOKEN}`;

export const handlers = [
  http.post("*/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string };
    if (body.email === profile.email && body.password === password) {
      return HttpResponse.json({
        token: TOKEN,
        user: { id: profile.id, name: profile.display_name, email: profile.email },
      });
    }
    return HttpResponse.json({ message: "Credenciais inválidas" }, { status: 401 });
  }),

  http.post("*/api/auth/logout", () => new HttpResponse(null, { status: 204 })),

  http.get("*/api/profile", ({ request }) => {
    if (!isAuthed(request)) return unauthorized();
    return HttpResponse.json(profile);
  }),

  http.put("*/api/profile", async ({ request }) => {
    if (!isAuthed(request)) return unauthorized();
    const body = (await request.json()) as Partial<ProfileDto>;
    profile = { ...profile, ...body, id: profile.id };
    return HttpResponse.json(profile);
  }),

  http.put("*/api/profile/password", async ({ request }) => {
    if (!isAuthed(request)) return unauthorized();
    const body = (await request.json()) as { current_password?: string; new_password?: string };
    if (body.current_password !== password) {
      return HttpResponse.json({ message: "Senha atual incorreta" }, { status: 422 });
    }
    password = body.new_password ?? password;
    return new HttpResponse(null, { status: 204 });
  }),
];
