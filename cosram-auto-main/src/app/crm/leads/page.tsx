import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function LeadsPage() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/crm/login");
  }

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            👥 Lead-uri
          </h1>

          <p className="text-gray-500">
            Gestionarea clienților interesați
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow overflow-hidden">

          {error && (
            <div className="p-4 text-red-600">
              Eroare: {error.message}
            </div>
          )}

          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-4 text-left">
                  👤 Client
                </th>

                <th className="p-4 text-left">
                  📱 Telefon
                </th>

                <th className="p-4 text-left">
                  🚗 Mașină
                </th>

                <th className="p-4 text-left">
                  📊 Status
                </th>

                <th className="p-4 text-left">
                  ⚡ Acțiuni
                </th>
              </tr>
            </thead>

            <tbody>
              {leads?.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-6 text-center text-gray-400"
                  >
                    Nu există lead-uri.
                  </td>
                </tr>
              )}

              {leads?.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b"
                >
                  <td className="p-4 font-medium">
                    {lead.full_name}
                  </td>

                  <td className="p-4">
                    {lead.phone}
                  </td>

                  <td className="p-4">
                    {lead.car}
                  </td>

                  <td className="p-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm">
                      {lead.status || "nou"}
                    </span>
                  </td>

                  <td className="p-4">
                    📞 💬 👁️
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </main>
  );
}
