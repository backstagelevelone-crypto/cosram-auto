import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";
import StatusSelect from "@/components/StatusSelect";

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
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="mx-auto max-w-7xl">


        <div className="mb-8">

          <h1 className="text-3xl font-bold">
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



        <div className="rounded-2xl bg-white shadow overflow-hidden">


          {error && (
            <div className="p-4 text-red-600">
              Eroare: {error.message}
            </div>
          )}



          {/* scroll mobil */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">


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
                    📍 Sursă
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
                      colSpan={6}
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
                      {lead.car || "-"}
                    </td>



                    <td className="p-4">
                      {lead.source || "-"}
                    </td>



                    <td className="p-4">

                      <StatusSelect
                        id={lead.id}
                        status={lead.status}
                      />

                    </td>



                    <td className="p-4">

                      <div className="flex gap-3">


                        <a
                          href={`tel:${lead.phone}`}
                          title="Sună clientul"
                          className="text-xl"
                        >
                          📞
                        </a>



                        <a
                          href={`https://wa.me/40${lead.phone?.replace(/^0/, "")}`}
                          target="_blank"
                          title="WhatsApp"
                          className="text-xl"
                        >
                          💬
                        </a>



                        <a
                          href={`/crm/leads/${lead.id}`}
                          title="Vezi detalii"
                          className="text-xl"
                        >
                          👁️
                        </a>


                      </div>

                    </td>


                  </tr>


                ))}


              </tbody>


            </table>


          </div>


        </div>


      </div>


    </main>
  );
}
