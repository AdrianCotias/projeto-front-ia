import { LogIn, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/mercado", label: "Mercado" },
  { href: "/criadores", label: "Criadores" },
  { href: "/aprenda", label: "Aprenda" },
];

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="logo">KURIO</Link>
      <nav aria-label="Principal">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className={item.href === "/" ? "active" : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <button type="button" className="icon-button" aria-label="Buscar">
          <Search size={24} />
        </button>
        <button type="button" className="icon-button cart" aria-label="Carrinho">
          <ShoppingCart size={24} />
          <span className="badge">6</span>
        </button>
        <Link href="/login" className="button primary">
          <LogIn size={20} /> Entrar
        </Link>
      </div>
    </header>
  );
}
