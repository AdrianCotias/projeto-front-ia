"use client";

import { ChevronDown, ImageIcon } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { ENS_SUFFIXES, type EnsSuffix, type Profile } from "@/domain/user/profile";
import { useChangePassword, useUpdateProfile } from "./use-profile";

type Status = { kind: "success" | "error"; message: string } | null;

export function ProfileForm({ profile }: { profile: Profile }) {
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();

  const [displayName, setDisplayName] = useState(profile.displayName);
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [ensName, setEnsName] = useState(profile.ensName);
  const [ensSuffix, setEnsSuffix] = useState<EnsSuffix>(profile.ensSuffix);
  const [walletNickname, setWalletNickname] = useState(profile.walletNickname);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile.avatarUrl);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<Status>(null);

  const saving = updateProfile.isPending || changePassword.isPending;

  function onAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(String(reader.result));
    reader.readAsDataURL(file);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus(null);
    try {
      await updateProfile.mutateAsync({
        displayName,
        username,
        email,
        ensName,
        ensSuffix,
        walletNickname,
        avatarUrl,
      });
      if (currentPassword || newPassword || confirmPassword) {
        await changePassword.mutateAsync({ currentPassword, newPassword, confirmPassword });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
      setStatus({ kind: "success", message: "Alterações salvas." });
    } catch (error) {
      setStatus({
        kind: "error",
        message: error instanceof Error && error.message ? error.message : "Não foi possível salvar.",
      });
    }
  }

  return (
    <form className="profile-form" onSubmit={onSubmit}>
      <h1>Perfil do colecionador</h1>

      <div className="profile-grid">
        <div className="column">
          <Field label="Nome de exibição" htmlFor="displayName" required>
            <input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
          </Field>
          <Field label="E-mail" htmlFor="email" required>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <Field label="Apelido da carteira" htmlFor="walletNickname" required>
            <input
              id="walletNickname"
              value={walletNickname}
              onChange={(e) => setWalletNickname(e.target.value)}
              required
            />
          </Field>
        </div>

        <div className="column">
          <Field label="Nome de usuário" htmlFor="username" required>
            <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </Field>
          <Field label="Nome ENS" htmlFor="ensName" required>
            <div className="ens-row">
              <div className="select">
                <select
                  aria-label="Sufixo ENS"
                  value={ensSuffix}
                  onChange={(e) => setEnsSuffix(e.target.value as EnsSuffix)}
                >
                  {ENS_SUFFIXES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown size={18} aria-hidden="true" />
              </div>
              <input id="ensName" value={ensName} onChange={(e) => setEnsName(e.target.value)} required />
            </div>
          </Field>
          <div className="field avatar-field">
            <span className="label">Avatar</span>
            <div className="avatar-row">
              <span className="avatar">
                {avatarUrl ? <img src={avatarUrl} alt="Avatar" /> : <ImageIcon size={28} aria-hidden="true" />}
              </span>
              <label className="button primary">
                Alterar
                <input type="file" accept="image/*" hidden onChange={onAvatarChange} />
              </label>
              <button type="button" className="link-button" onClick={() => setAvatarUrl(null)}>
                Remover
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2>Alterar senha</h2>
      <div className="password-section">
        <Field label="Senha atual" htmlFor="currentPassword">
          <PasswordInput
            id="currentPassword"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Field>
        <Field label="Nova senha" htmlFor="newPassword">
          <PasswordInput
            id="newPassword"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Field>
        <Field label="Confirmar nova senha" htmlFor="confirmPassword">
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Field>
      </div>

      <button type="submit" className="button primary" disabled={saving}>
        {saving ? "Salvando..." : "Salvar"}
      </button>
      {status && (
        <p role={status.kind === "error" ? "alert" : "status"} className={`status ${status.kind}`}>
          {status.message}
        </p>
      )}
    </form>
  );
}
