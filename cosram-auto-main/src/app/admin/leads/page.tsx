import { supabase } from "@/lib/supabase";

export default async function LeadsPage() {
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main style={{ padding: 40 }}>
      <h1>🚗 Cosram CRM</h1>

      {error && (
        <p style={{ color: "red" }}>
          Eroare: {error.message}
        </p>
      )}

      <table
        style={{
          width: "100%",
          marginTop: 20,
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
    </main>
  );
}
