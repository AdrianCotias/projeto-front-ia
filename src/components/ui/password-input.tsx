"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes } from "react";

export function PasswordInput(props: Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="password-input">
      <input {...props} type={visible ? "text" : "password"} />
      <button
        type="button"
        className="icon-button"
        aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        onClick={() => setVisible((v) => !v)}
      >
        {visible ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
    </div>
  );
}
