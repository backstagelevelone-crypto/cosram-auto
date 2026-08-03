import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import DashboardRealtime from "@/components/DashboardRealtime";

export default async function DashboardPage() {
  const supabase = await supabaseServer();

  const { data: leads } = await supabase
    .from("leads")
    .select("status");

  const total = leads?.length || 0;

  const noi =
    leads?.filter(
      (lead) => !lead.status || lead.status === "nou"
    ).length || 0;

  const deSunat =
    leads?.filter(
      (lead) => lead.status === "de_sunat"
    ).length || 0;

  const contactati =
    leads?.filter(
      (lead) => lead.status === "contactat"
    ).length || 0;

  const calificati =
    leads?.filter(
      (lead) => lead.status === "calificat"
    ).length || 0;

  const aprobati =
    leads?.filter(
      (lead) => lead.status === "aprobat"
    ).length || 0;

  const vanduti =
    leads?.filter(
      (lead) => lead.status === "vandut"
    ).length || 0;

  const pierduti =
    leads?.filter(
      (lead) => lead.status === "pierdut"
    ).length || 0;

  const biroulCreditRespins =
  leads?.filter(
    (lead) => lead.status === "biroul_credit_respins"
  ).length || 0;
  const rataCalificare =
  total > 0
    ? Math.round((calificati / total) * 100)
    : 0;

const dosareAprobate =
  calificati > 0
    ? Math.round((aprobati / calificati) * 100)
    : 0;

const rataVanzare =
  total > 0
    ? Math.round((vanduti / total) * 100)
    : 0;

const rataRespinsi =
  calificati > 0
    ? Math.round((biroulCreditRespins / calificati) * 100)
    : 0;

  const cards = [
    {
      title: "Total Lead-uri",
      value: total,
      icon: "👥",
      href: "/crm/leads",
    },
    {
      title: "Noi",
      value: noi,
      icon: "🆕",
      href: "/crm/leads?status=nou",
    },
    {
      title: "De sunat",
      value: deSunat,
      icon: "📞",
      href: "/crm/leads?status=de_sunat",
    },
    {
      title: "Contactați",
      value: contactati,
      icon: "🔵",
      href: "/crm/leads?status=contactat",
    },
    {
      title: "Calificați",
      value: calificati,
      icon: "🟢",
      href: "/crm/leads?status=calificat",
    },
    {
      title: "Aprobați",
      value: aprobati,
      icon: "✅",
      href: "/crm/leads?status=aprobat",
    },
    {
      title: "Vânduți",
      value: vanduti,
      icon: "🚗",
      href: "/crm/leads?status=vandut",
    },
    {
      title: "Pierduți",
      value: pierduti,
      icon: "❌",
      href: "/crm/leads?status=pierdut",
    },
    {
  title: "Biroul de Credit Respins",
  value: biroulCreditRespins,
  icon: "🏦",
  href: "/crm/leads?status=biroul_credit_respins",
},
  ];

  return (
  <>
    <DashboardRealtime />

    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        📊 Dashboard
      </h1>

      <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base">
        Situația lead-urilor Cosram Auto
      </p>
      <div className="mb-6 grid grid-cols-2 xl:grid-cols-4 gap-3">

  <div className="rounded-xl bg-white shadow p-2.5 md:p-3">
    <p className="text-[11px] md:text-xs text-gray-500 font-medium">
      🟢 Rată Calificare
    </p>

    <h2 className="mt-1 text-2xl md:text-3xl font-bold text-green-600">
      {rataCalificare}%
    </h2>

    <p className="mt-1 text-xs md:text-sm text-gray-400">
      {calificati} / {total} lead-uri
    </p>
  </div>

  <div className="rounded-xl bg-white shadow p-2.5 md:p-3">
    <p className="text-[11px] md:text-xs text-gray-500 font-medium">
      ✅ Dosare Aprobate
    </p>

    <h2 className="mt-1 text-2xl md:text-3xl font-bold text-blue-600">
      {dosareAprobate}%
    </h2>

    <p className="mt-1 text-xs md:text-sm text-gray-400">
      {aprobati} / {calificati} calificați
    </p>
  </div>

  <div className="rounded-xl bg-white shadow p-2.5 md:p-3">
    <p className="text-[11px] md:text-xs text-gray-500 font-medium">
      🚗 Rată Vânzare
    </p>

    <h2 className="mt-1 text-2xl md:text-3xl font-bold text-purple-600">
      {rataVanzare}%
    </h2>

    <p className="mt-1 text-xs md:text-sm text-gray-400">
      {vanduti} / {total} lead-uri
    </p>
  </div>

  <div className="rounded-xl bg-white shadow p-2.5 md:p-3">
    <p className="text-xs md:text-sm text-gray-500 font-medium">
      ❌ Biroul de Credit Respins
    </p>

    <h2 className="mt-1 text-2xl md:text-3xl font-bold text-red-600">
      {rataRespinsi}%
    </h2>

    <p className="mt-1 text-xs md:text-sm text-gray-400">
      {biroulCreditRespins} / {calificati} calificați
    </p>
  </div>

</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="
              rounded-2xl
              bg-white
              p-5
              shadow
              hover:shadow-lg
              transition
              active:scale-95
            "
          >
            <div className="text-3xl mb-3">
              {card.icon}
            </div>

            <div className="text-gray-500 text-sm md:text-base">
              {card.title}
            </div>

            <div className="text-3xl md:text-4xl font-bold mt-2">
              {card.value}
            </div>
          </Link>
        ))}
      </div>
    </main>
    </>
  );
}
