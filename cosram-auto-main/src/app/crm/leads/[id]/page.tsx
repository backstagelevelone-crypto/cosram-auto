import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";

export default async function LeadDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await supabaseServer();

  const { data: lead, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !lead) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-3xl">

        <div className="rounded-2xl bg-white p-8 shadow">

          <h1 className="text-3xl font-bold mb-6">
            👤 {lead.full_name}
          </h1>

          <div className="space-y-4">

            <div>
              <b>📱 Telefon:</b>
              <p>{lead.phone}</p>
            </div>

            <div>
              <b>📧 Email:</b>
              <p>{lead.email || "-"}</p>
            </div>

            <div>
              <b>🚗 Mașină:</b>
              <p>{lead.car || "-"}</p>
            </div>

            <div>
              <b>🚘 Mașină dorită:</b>
              <p>{lead.car_interest || "-"}</p>
            </div>

            <div>
              <b>📍 Sursă:</b>
              <p>{lead.source || "-"}</p>
            </div>

            <div>
              <b>📊 Status:</b>
              <p>{lead.status || "nou"}</p>
            </div>

            <div>
              <b>📅 Creat:</b>
              <p>
                {lead.created_at
                  ? new Date(lead.created_at).toLocaleDateString("ro-RO")
                  : "-"}
              </p>
            </div>

          </div>

          <div className="flex gap-4 mt-8">

            <a
              href={`tel:${lead.phone}`}
              className="rounded-lg bg-green-600 px-5 py-3 text-white"
            >
              📞 Sună
            </a>

            <a
              href={`https://wa.me/${lead.phone?.replace(/^0/, "")}`}
              target="_blank"
              className="rounded-lg bg-green-500 px-5 py-3 text-white"
            >
              💬 WhatsApp
            </a>

          </div>

        </div>

      </div>
    </main>
  );
}
