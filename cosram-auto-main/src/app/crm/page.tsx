import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";

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

  const contactati =
    leads?.filter(
      (lead) => lead.status === "contactat"
    ).length || 0;

  const calificati =
    leads?.filter(
      (lead) => lead.status === "calificat"
    ).length || 0;

  const vanduti =
    leads?.filter(
      (lead) => lead.status === "vandut"
    ).length || 0;

  const pierduti =
    leads?.filter(
      (lead) => lead.status === "pierdut"
    ).length || 0;


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
      icon: "🟡",
      href: "/crm/leads?status=nou",
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
      title: "Vânduți",
      value: vanduti,
      icon: "🚗",
      href: "/crm/leads?status=vandut",
    },
    {
      title: "Pierduți",
      value: pierduti,
      icon: "🔴",
      href: "/crm/leads?status=pierdut",
    },
  ];


  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">

      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        📊 Dashboard
      </h1>

      <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base">
        Situația lead-urilor Cosram Auto
      </p>


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
  );
}
