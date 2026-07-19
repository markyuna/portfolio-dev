"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminSessionBaseline } from "@/lib/admin-session-storage";

const links = [
  { label: "Brief → Devis", href: "/admin/brief-devis" },
  { label: "Cadrage", href: "/admin/cadrage" },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const session = useAdminSessionBaseline();
  const clientName = session?.lead.name.trim();

  return (
    <nav className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  active ? "bg-white text-black" : "text-white/60 hover:text-white",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {clientName && (
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            Client actif : <span className="font-medium text-white">{clientName}</span>
          </span>
        )}
      </div>
    </nav>
  );
}
