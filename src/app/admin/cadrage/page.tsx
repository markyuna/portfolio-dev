import type { Metadata } from "next";
import AdminCadrageWorkspace from "@/components/admin/AdminCadrageWorkspace";

export const metadata: Metadata = {
  title: "Cadrage — Admin",
};

export default function AdminCadragePage() {
  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-white">Cadrage</h1>
        <p className="mt-2 text-sm text-white/50">
          À remplir en direct pendant l&apos;appel de cadrage avec le client.
        </p>

        <div className="mt-10">
          <AdminCadrageWorkspace />
        </div>
      </div>
    </main>
  );
}
