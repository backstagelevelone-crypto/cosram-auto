import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function parseCSV(text: string) {
  const lines = text.split("\n");

  const headers = lines[0]
    .split(",")
    .map((h) => h.replace(/"/g, "").trim());

  return lines
    .slice(1)
    .filter(Boolean)
    .map((line) => {
      const values =
        line
          .match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
          ?.map((v) => v.replace(/^"|"$/g, "").trim()) || [];

      const obj: any = {};

      headers.forEach((header, index) => {
        obj[header] = values[index] || "";
      });

      return obj;
    });
}

export async function GET() {
  try {
    const sheetURL = process.env.GOOGLE_SHEET_CSV_URL;

    if (!sheetURL) {
      return NextResponse.json(
        { error: "Lipsește GOOGLE_SHEET_CSV_URL" },
        { status: 500 }
      );
    }

    // fortam citirea live din Google Sheet
    const response = await fetch(
      sheetURL + "&t=" + Date.now(),
      {
        cache: "no-store",
      }
    );

    const csv = await response.text();

    const leads = parseCSV(csv);

    let imported = 0;

    for (const lead of leads) {

      const phone = lead.phone_number || "";
      const email = lead.email || "";

      if (!phone && !email) continue;


      let exists = false;


      if (phone) {
        const { data } = await supabase
          .from("leads")
          .select("id")
          .eq("phone", phone)
          .limit(1);

        if (data && data.length > 0) {
          exists = true;
        }
      }


      if (!exists && email) {
        const { data } = await supabase
          .from("leads")
          .select("id")
          .eq("email", email)
          .limit(1);

        if (data && data.length > 0) {
          exists = true;
        }
      }


      if (exists) continue;


      const { error } = await supabase
        .from("leads")
        .insert({
          client_name:
            lead.full_name || "Lead Facebook",

          phone,

          email,

          status: "nou",

          source:
            lead.campaign_name || "Facebook Ads",

          created_at:
            lead.created_time
              ? new Date(lead.created_time)
              : new Date(),
        });


      if (!error) {
        imported++;
      }
    }


    return NextResponse.json({
      success: true,
      total: leads.length,
      imported,
    });


  } catch (error: any) {

    console.log(
      "SYNC META LEADS ERROR",
      error
    );

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
