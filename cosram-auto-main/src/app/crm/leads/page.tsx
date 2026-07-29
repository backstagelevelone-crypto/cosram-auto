import TopBar from "@/components/admin/TopBar";
import DashboardCards from "@/components/admin/DashboardCards";
import StatusSelect from "@/components/admin/StatusSelect";
import LeadActions from "@/components/admin/LeadActions";
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
    leads?.filter(
      (lead) => lead.status === "calificat"
    ).length ?? 0;


  const sold =
    leads?.filter(
      (lead) => lead.status === "vandut"
    ).length ?? 0;


  return (
    <>
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

        <h2 style={{ marginBottom: 20 }}>
          Lead-uri
        </h2>


        {error && (
          <p style={{ color: "red" }}>
            {error.message}
          </p>
        )}



        {/* DESKTOP */}

        <div className="hidden md:block">

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >

            <thead>
              <tr style={{ borderBottom: "2px solid #e5e7eb" }}>

                <th align="left" style={{ padding:12 }}>
                  Nume
                </th>

                <th align="left" style={{ padding:12 }}>
                  Telefon
                </th>

                <th align="left" style={{ padding:12 }}>
                  Mașină
                </th>

                <th align="left" style={{ padding:12 }}>
                  Status
                </th>

                <th align="left" style={{ padding:12 }}>
                  Acțiuni
                </th>

              </tr>
            </thead>


            <tbody>

              {leads?.map((lead) => (

                <tr
                  key={lead.id}
                  style={{
                    borderBottom:"1px solid #f1f5f9",
                  }}
                >

                  <td style={{padding:12}}>
                    {lead.full_name}
                  </td>


                  <td style={{padding:12}}>
                    {lead.phone}
                  </td>


                  <td style={{padding:12}}>
                    {lead.car || "-"}
                  </td>


                  <td style={{padding:12}}>
                    <StatusSelect
                      id={lead.id}
                      status={lead.status}
                    />
                  </td>


                  <td style={{padding:12}}>
                    <LeadActions
                      phone={lead.phone}
                    />
                  </td>


                </tr>

              ))}

            </tbody>

          </table>

        </div>



        {/* MOBIL */}

        <div className="md:hidden">

          {leads?.map((lead) => (

            <div
              key={lead.id}
              style={{
                background:"#f8fafc",
                border:"1px solid #e5e7eb",
                borderRadius:16,
                padding:16,
                marginBottom:16,
              }}
            >

              <h3
                style={{
                  fontSize:18,
                  fontWeight:700,
                  marginBottom:12,
                }}
              >
                👤 {lead.full_name}
              </h3>


              <p>
                📞 {lead.phone}
              </p>


              <p style={{marginTop:8}}>
                🚗 {lead.car || "-"}
              </p>


              <div style={{marginTop:16}}>

                <div
                  style={{
                    fontSize:13,
                    color:"#64748b",
                    marginBottom:6,
                  }}
                >
                  Status
                </div>


                <StatusSelect
                  id={lead.id}
                  status={lead.status}
                />

              </div>


              <div style={{marginTop:16}}>
                <LeadActions
                  phone={lead.phone}
                />
              </div>


            </div>

          ))}

        </div>


      </div>
    </>
  );
}
