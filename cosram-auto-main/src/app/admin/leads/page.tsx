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
    leads?.filter((lead) => lead.status === "calificat").length ?? 0;

  const sold =
    leads?.filter((lead) => lead.status === "vandut").length ?? 0;


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
        className="bg-white rounded-2xl shadow p-4 md:p-6"
      >

        <h2 className="text-2xl font-bold mb-5">
          Lead-uri
        </h2>


        {error && (
          <p className="text-red-500">
            {error.message}
          </p>
        )}



        {/* DESKTOP TABLE */}
        <div className="hidden md:block">

          <table
            className="w-full border-collapse"
          >

            <thead>
              <tr className="border-b-2 border-gray-200">

                <th className="text-left p-3">
                  Nume
                </th>

                <th className="text-left p-3">
                  Telefon
                </th>

                <th className="text-left p-3">
                  Mașină
                </th>

                <th className="text-left p-3">
                  Status
                </th>

                <th className="text-left p-3">
                  Acțiuni
                </th>

              </tr>
            </thead>


            <tbody>

              {leads?.map((lead) => (

                <tr
                  key={lead.id}
                  className="border-b border-gray-100"
                >

                  <td className="p-3">
                    {lead.full_name}
                  </td>


                  <td className="p-3">
                    {lead.phone}
                  </td>


                  <td className="p-3">
                    {lead.car || "-"}
                  </td>


                  <td className="p-3">

                    <StatusSelect
                      id={lead.id}
                      status={lead.status}
                    />

                  </td>


                  <td className="p-3">

                    <LeadActions
                      phone={lead.phone}
                    />

                  </td>


                </tr>

              ))}


            </tbody>

          </table>

        </div>




        {/* MOBIL CARDURI */}

        <div className="md:hidden space-y-4">


          {leads?.map((lead) => (

            <div
              key={lead.id}
              className="rounded-2xl bg-slate-50 p-5 shadow-sm border"
            >


              <h3 className="text-xl font-bold mb-4">
                👤 {lead.full_name}
              </h3>


              <div className="mb-2 text-gray-700">
                📱 {lead.phone}
              </div>


              <div className="mb-4 text-gray-700">
                🚗 {lead.car || "-"}
              </div>



              <div className="mb-4">

                <div className="text-sm text-gray-500 mb-2">
                  Status
                </div>


                <StatusSelect
                  id={lead.id}
                  status={lead.status}
                />

              </div>



              <LeadActions
                phone={lead.phone}
              />


            </div>

          ))}


        </div>


      </div>

    </>
  );
}
