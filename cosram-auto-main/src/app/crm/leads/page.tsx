import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function LeadsPage() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/crm/login");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Lead-uri
          </h1>

          <p className="text-gray-500">
            Gestionarea lead-urilor Cosram Auto
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow">
          <div className="border-b p-4">
            <input
              type="text"
              placeholder="🔍 Caută lead..."
              className="w-full rounded-lg border p-3"
            />
          </div>

          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-4 text-left">👤 Client</th>
                <th className="p-4 text-left">📱 Telefon</th>
                <th className="p-4 text-left">🚗 Mașină</th>
                <th className="p-4 text-left">📊 Status</th>
                <th className="p-4 text-left">⚡ Acțiuni</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td
                  className="p-4 text-gray-400"
                  colSpan={5}
                >
                  Nu există lead-uri.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
