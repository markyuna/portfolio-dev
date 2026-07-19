import type { Metadata } from "next";
import AdminBriefDevisWorkspace from "@/components/admin/AdminBriefDevisWorkspace";

export const metadata: Metadata = {
  title: "Brief & devis — Admin",
};

export default function AdminBriefDevisPage() {
  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-white">
          Brief & devis
        </h1>
        <p className="mt-2 text-sm text-white/50">
          Importez un brief reçu par email ou remplissez-le manuellement, puis
          générez le devis et le prompt Claude Code.
        </p>

        <div className="mt-10">
          <AdminBriefDevisWorkspace />
        </div>
      </div>
    </main>
  );
}
