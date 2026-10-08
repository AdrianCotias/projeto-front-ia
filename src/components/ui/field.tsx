import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}

export function Field({ label, htmlFor, required, children }: FieldProps) {
  return (
    <div className="field">
      <label htmlFor={htmlFor}>
        {label}
        {required && <span className="required" aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  );
}
