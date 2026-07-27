import Sidebar from "../Sidebar";
import DashboardCards from "@/components/admin/DashboardCards";
import { supabase } from "@/lib/supabase";

export default async function LeadsPage() {
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  const total = leads?.length ?? 0;

  const today =
    leads?.filter((lead) => {
      const d = new Date(lead.created_at);
      const now = new Date();

      return (
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    }).length ?? 0;

  const qualified =
    leads?.filter((lead) => lead.status === "calificat").length ?? 0;

  const sold =
    leads?.filter((lead) => lead.status === "vandut").length ?? 0;

  return (
    <>
      <Sidebar />

      <main
        style={{
          marginLeft: 260,
          padding: 40,
          background: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            fontSize: 34,
            fontWeight: 700,
            marginBottom: 30,
            color: "#111827",
          }}
        >
          Dashboard Lead-uri
        </h1>

        <DashboardCards
          total={total}
          today={today}
          qualified={qualified}
          sold={sold}
        />

        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 10px 30px rgba(0,0,0,.05)",
          }}
        >
          <h2>Lead-uri</h2>

          {error && (
            <p style={{ color: "red" }}>
              {error.message}
            </p>
          )}

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th align="left">Nume</th>
                <th align="left">Telefon</th>
                <th align="left">Mașină</th>
                <th align="left">Status</th>
              </tr>
            </thead>

            <tbody>
              {leads?.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.full_name}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.car}</td>
                  <td>{lead.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
