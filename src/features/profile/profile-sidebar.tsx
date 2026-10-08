"use client";

import {
  Download,
  Heart,
  LogOut,
  MapPin,
  ShoppingCart,
  TrendingUp,
  TriangleAlert,
  User,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../auth/auth-services";

const ITEMS: { label: string; icon: LucideIcon; active?: boolean }[] = [
  { label: "Dados do perfil", icon: User, active: true },
  { label: "Carteiras", icon: MapPin },
  { label: "Atividade", icon: ShoppingCart },
  { label: "Lista de interesse", icon: Heart },
  { label: "Ofertas", icon: TrendingUp },
  { label: "Arquivos baixados", icon: Download },
  { label: "Suporte", icon: TriangleAlert },
];

export function ProfileSidebar() {
  const router = useRouter();
  const queryClient = useQueryClient();

  async function onLogout() {
    await logoutUser();
    queryClient.clear();
    router.push("/login");
  }

  return (
    <aside className="sidebar" aria-label="Meu perfil">
      <h2>Meu perfil</h2>
      <ul>
        {ITEMS.map(({ label, icon: Icon, active }) => (
          <li key={label}>
            <button
              type="button"
              className={active ? "sidebar-item active" : "sidebar-item"}
              aria-current={active ? "page" : undefined}
              disabled={!active}
              title={active ? undefined : "Em breve"}
            >
              <Icon size={22} /> {label}
            </button>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <button type="button" className="sidebar-item logout" onClick={onLogout}>
          <LogOut size={22} /> Sair
        </button>
      </div>
    </aside>
  );
}
