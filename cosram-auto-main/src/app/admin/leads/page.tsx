import Sidebar from "../Sidebar";
import TopBar from "@/components/admin/TopBar";
import DashboardCards from "@/components/admin/DashboardCards";
import StatusBadge from "@/components/admin/StatusBadge";
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
        <TopBar />

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
          <h2
            style={{
              marginBottom: 20,
              color: "#111827",
            }}
          >
            Lead-uri
          </h2>

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
              <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                <th align="left" style={{ padding: 12 }}>Nume</th>
                <th align="left" style={{ padding: 12 }}>Telefon</th>
                <th align="left" style={{ padding: 12 }}>Mașină</th>
                <th align="left" style={{ padding: 12 }}>Status</th>
              </tr>
            </thead>

            <tbody>
              {leads?.map((lead) => (
                <tr
                  key={lead.id}
                  style={{
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  <td style={{ padding: 12 }}>{lead.full_name}</td>
                  <td style={{ padding: 12 }}>{lead.phone}</td>
                  <td style={{ padding: 12 }}>{lead.car}</td>
                  <td style={{ padding: 12 }}>
                    <StatusBadge status={lead.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
