import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);


async function sendMetaConversion(
  phone?: string,
  email?: string
) {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/meta/qualified`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          email,
        }),
      }
    );
  } catch (error) {
    console.log("META ERROR:", error);
  }
}


export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { id, status } = body;

    console.log("UPDATE STATUS:", id, status);


    if (!id || !status) {
      return NextResponse.json(
        {
          error: "Lipsesc datele necesare.",
        },
        {
          status: 400,
        }
      );
    }


    const { data: lead, error: findError } = await supabase
      .from("leads")
      .select("phone,email")
      .eq("id", id)
      .single();


    if (findError) {
      return NextResponse.json(
        {
          error: findError.message,
        },
        {
          status: 500,
        }
      );
    }


    const { data, error } = await supabase
      .from("leads")
      .update({
        status,
      })
      .eq("id", id)
      .select();


    if (error) {
      console.log("SUPABASE ERROR:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }


    console.log("UPDATED:", data);


    // trimitem conversia la Meta doar când devine calificat
    if (status === "calificat") {
      await sendMetaConversion(
        lead?.phone,
        lead?.email
      );
    }


    return NextResponse.json({
      success: true,
      lead: data,
    });


  } catch (error) {

    console.log("API ERROR:", error);

    return NextResponse.json(
      {
        error: "Request invalid.",
      },
      {
        status: 400,
      }
    );
  }
}
