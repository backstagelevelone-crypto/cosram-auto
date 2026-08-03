import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";
import StatusSelect from "@/components/StatusSelect";
import LeadsRealtime from "@/components/LeadsRealtime";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
  }>;
}) {
  const { status } = await searchParams;

  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/crm/login");
  }

  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data: leads, error } = await query;

  return (
  <>
    <LeadsRealtime />

    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            👥 Lead-uri
          </h1>

          <p className="text-gray-500">
            Gestionarea clienților interesați
          </p>

          {status && (
            <p className="mt-2 text-sm text-blue-600">
              Filtru activ: {status}
            </p>
          )}
        </div>

        {error && (
          <div className="rounded-xl bg-white p-4 text-red-600 mb-4">
            Eroare: {error.message}
          </div>
        )}

        {/* ======================= */}
        {/* MOBIL */}
        {/* ======================= */}

        <div className="md:hidden space-y-4">

          {leads?.length === 0 && (
            <div className="rounded-xl bg-white p-6 text-center text-gray-400 shadow">
              Nu există lead-uri.
            </div>
          )}

          {leads?.map((lead) => (

            <div
              key={lead.id}
              className="rounded-2xl bg-white shadow p-4"
            >

              <div className="text-lg font-semibold">
                {lead.full_name}
              </div>

              <div className="mt-3">

                <StatusSelect
                  id={lead.id}
                  status={lead.status}
                />

              </div>

              <div className="mt-4 space-y-2 text-sm">

                <div>
                  <strong>📞 Telefon:</strong>{" "}
                  {lead.phone}
                </div>

                <div>
                  <strong>📅 Data:</strong>{" "}
                  {new Date(
                    lead.created_at
                  ).toLocaleString("ro-RO", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                <div>
                  <strong>📍 Sursă:</strong>{" "}
                  {lead.source || "-"}
                </div>

              </div>

              <div className="mt-5 flex justify-center gap-8 text-2xl">

                <a
                  href={`tel:${lead.phone}`}
                  title="Sună"
                >
                  📞
                </a>

                <a
                  href={`https://wa.me/${lead.phone?.replace(/^0/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp"
                >
                  💬
                </a>

                <a
                  href={`/crm/leads/${lead.id}`}
                  title="Detalii"
                >
                  👁️
                </a>

              </div>

            </div>

          ))}

        </div>

        {/* ======================= */}
        {/* DESKTOP */}
        {/* ======================= */}

        <div className="hidden md:block rounded-2xl bg-white shadow overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="border-b bg-gray-50">

                <tr>

                  <th className="px-3 py-2 text-left">
                    👤 Client
                  </th>

                  <th className="px-3 py-2 text-center">
                    ⚡ Acțiuni
                  </th>

                  <th className="px-3 py-2 text-left">
                    📊 Status
                  </th>

                  <th className="px-3 py-2 text-left">
                    📱 Telefon
                  </th>

                  <th className="px-3 py-2 text-left">
                    📅 Data
                  </th>

                  <th className="px-3 py-2 text-left">
                    📍 Sursă
                  </th>

                </tr>

              </thead>

              <tbody>

                {leads?.length === 0 && (

                  <tr>

                    <td
                      colSpan={6}
                      className="py-6 text-center text-gray-400"
                    >
                      Nu există lead-uri.
                    </td>

                  </tr>

                )}
                                {leads?.map((lead) => (

                  <tr
                    key={lead.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="px-3 py-2 font-medium whitespace-nowrap">
                      {lead.full_name}
                    </td>

                    <td className="px-3 py-2">
                      <div className="flex justify-center gap-3 text-lg">

                        <a
                          href={`tel:${lead.phone}`}
                          title="Sună clientul"
                        >
                          📞
                        </a>

                        <a
                          href={`https://wa.me/${lead.phone?.replace(/^0/, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp"
                        >
                          💬
                        </a>

                        <a
                          href={`/crm/leads/${lead.id}`}
                          title="Vezi detalii"
                        >
                          👁️
                        </a>

                      </div>
                    </td>

                    <td className="px-3 py-2">
                      <StatusSelect
                        id={lead.id}
                        status={lead.status}
                      />
                    </td>

                    <td className="px-3 py-2 whitespace-nowrap">
                      {lead.phone}
                    </td>

                    <td className="px-3 py-2 whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleString("ro-RO", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    <td className="px-3 py-2 whitespace-nowrap">
                      {lead.source || "-"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </main>
      </>
  );
}
