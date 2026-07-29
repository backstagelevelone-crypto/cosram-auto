import TopBar from "@/components/admin/TopBar";
import DashboardCards from "@/components/admin/DashboardCards";
import StatusSelect from "@/components/admin/StatusSelect";
import LeadActions from "@/components/admin/LeadActions";
import { supabase } from "@/lib/supabase";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: {
    status?: string;
  };
}) {

  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });


  if (searchParams.status) {
    query = query.eq(
      "status",
      searchParams.status
    );
  }


  const { data: leads, error } = await query;


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
              <tr style={{ borderBottom:"2px solid #e5e7eb" }}>

                <th style={{padding:12,textAlign:"left"}}>
                  Nume
                </th>

                <th style={{padding:12,textAlign:"left"}}>
                  Telefon
                </th>

                <th style={{padding:12,textAlign:"left"}}>
                  Mașină
                </th>

                <th style={{padding:12,textAlign:"left"}}>
                  Status
                </th>

                <th style={{padding:12,textAlign:"left"}}>
                  Acțiuni
                </th>

              </tr>
            </thead>


            <tbody>

              {leads?.map((lead)=>(

                <tr
                  key={lead.id}
                  style={{
                    borderBottom:"1px solid #f1f5f9"
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

        <div className="md:hidden space-y-4">

          {leads?.map((lead)=>(

            <div
              key={lead.id}
              className="bg-slate-50 rounded-2xl p-5 border"
            >

              <h3 className="font-bold text-xl mb-3">
                👤 {lead.full_name}
              </h3>


              <p className="mb-2">
                📞 {lead.phone}
              </p>


              <p className="mb-4">
                🚗 {lead.car || "-"}
              </p>


              <StatusSelect
                id={lead.id}
                status={lead.status}
              />


              <div className="mt-4">
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
