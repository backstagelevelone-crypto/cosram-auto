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
    },
    {
      title: "Noi",
      value: noi,
      icon: "🟡",
    },
    {
      title: "Contactați",
      value: contactati,
      icon: "🔵",
    },
    {
      title: "Calificați",
      value: calificati,
      icon: "🟢",
    },
    {
      title: "Vânduți",
      value: vanduti,
      icon: "🚗",
    },
    {
      title: "Pierduți",
      value: pierduti,
      icon: "🔴",
    },
  ];


  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-3xl font-bold mb-2">
        📊 Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Situația lead-urilor Cosram Auto
      </p>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-white p-6 shadow"
          >

            <div className="text-3xl mb-4">
              {card.icon}
            </div>

            <div className="text-gray-500">
              {card.title}
            </div>

            <div className="text-4xl font-bold mt-2">
              {card.value}
            </div>

          </div>
        ))}

      </div>

    </main>
  );
}
