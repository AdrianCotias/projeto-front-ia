"use client";

import { ProfileForm } from "./profile-form";
import { ProfileSidebar } from "./profile-sidebar";
import { useProfile } from "./use-profile";

export function ProfileView() {
  const { data: profile, isLoading, isError } = useProfile();

  return (
    <div className="profile-layout">
      <ProfileSidebar />
      <section className="profile-content">
        {isLoading && <p>Carregando...</p>}
        {(isError || (!isLoading && !profile)) && (
          <p role="alert">
            Sessão inválida. <a href="/login">Entrar</a>
          </p>
        )}
        {profile && <ProfileForm key={profile.id} profile={profile} />}
      </section>
    </div>
  );
}
