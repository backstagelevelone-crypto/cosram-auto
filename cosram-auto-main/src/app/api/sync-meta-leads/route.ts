import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function parseCSV(text: string) {
  const rows = text
    .split(/\r?\n/)
    .filter((row) => row.trim() !== "");

  if (rows.length < 2) return [];

  const headers = rows[0]
    .split(",")
    .map((h) => h.replace(/"/g, "").trim());

  return rows.slice(1).map((row) => {
    const values: string[] = [];
    let current = "";
    let insideQuotes = false;

    for (const char of row) {
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === "," && !insideQuotes) {
        values.push(current);
        current = "";
      } else {
        current += char;
      }
    }

    values.push(current);

    const obj: Record<string, string> = {};

    headers.forEach((header, index) => {
      obj[header] = values[index]?.replace(/^"|"$/g, "").trim() || "";
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

    const response = await fetch(sheetURL + "&t=" + Date.now(), {
      cache: "no-store",
    });

    const csv = await response.text();

    const leads = parseCSV(csv);

    let imported = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const lead of leads) {
      const phone = (lead.phone_number || "")
        .replace(/^p:/i, "")
        .trim();

      const email = (lead.email || "")
        .trim()
        .toLowerCase();

      if (!phone && !email) {
        skipped++;
        continue;
      }

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

      if (exists) {
        skipped++;
        continue;
      }

      const { error } = await supabase
        .from("leads")
        .insert({
          client_name: lead.full_name || "Lead Facebook",
          phone,
          email,
          status: "nou",
          source: lead.campaign_name || "Facebook Ads",
          created_at: lead.created_time
            ? new Date(lead.created_time).toISOString()
            : new Date().toISOString(),
        });

      if (error) {
        console.error("INSERT ERROR:", error);
        errors.push(error.message);
        continue;
      }

      imported++;
    }

    return NextResponse.json({
      success: true,
      total: leads.length,
      imported,
      skipped,
      errors,
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
