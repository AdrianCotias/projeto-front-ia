import { makeLoginUser } from "@/application/auth/login-user";
import { makeLogoutUser } from "@/application/auth/logout-user";
import { restAuthService } from "@/infrastructure/auth/rest-auth-service";

export const loginUser = makeLoginUser(restAuthService);
export const logoutUser = makeLogoutUser(restAuthService);
