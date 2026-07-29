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
        { success: false, error: "GOOGLE_SHEET_CSV_URL lipsește" },
        { status: 500 }
      );
    }

    const response = await fetch(sheetURL + "&t=" + Date.now(), {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: "Nu pot descărca Google Sheet",
      });
    }

    const csv = await response.text();
    const leads = parseCSV(csv);

    let imported = 0;
    const errors: any[] = [];

    for (const lead of leads) {
      const phone = (lead.phone_number || "")
        .replace(/^p:/i, "")
        .trim();

      const email = (lead.email || "")
        .trim()
        .toLowerCase();

      const { data, error } = await supabase
        .from("leads")
        .insert({
          full_name: lead.full_name || "Lead Facebook",
          phone,
          email,
          status: "calificat",
          source: lead.campaign_name || "Facebook Ads",
          created_at: lead.created_time
            ? new Date(lead.created_time).toISOString()
            : new Date().toISOString(),
        })
        .select();

      if (error) {
        errors.push(error);
        console.error(error);
      } else {
        imported++;
      }
    }

    return NextResponse.json({
      success: true,
      total: leads.length,
      imported,
      errors,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        error: e.message,
      },
      {
        status: 500,
      }
    );
  }
}
