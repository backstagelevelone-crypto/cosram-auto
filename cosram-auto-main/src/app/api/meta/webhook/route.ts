import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);


const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;



// VERIFICARE META WEBHOOK
export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);


  const mode = searchParams.get(
    "hub.mode"
  );

  const token = searchParams.get(
    "hub.verify_token"
  );

  const challenge = searchParams.get(
    "hub.challenge"
  );


  if (
    mode === "subscribe" &&
    token === VERIFY_TOKEN
  ) {

    return new Response(
      challenge
    );

  }


  return NextResponse.json(
    {
      error: "Verification failed",
    },
    {
      status: 403,
    }
  );

}



// PRIMIRE LEAD META
export async function POST(req: Request) {

  try {

    const body = await req.json();


    console.log(
      "META WEBHOOK BODY:",
      JSON.stringify(body, null, 2)
    );



    const change =
      body?.entry?.[0]?.changes?.[0]?.value;



    if (!change) {

      return NextResponse.json({
        received: true,
      });

    }



    const leadgenId =
      change.leadgen_id;



    if (!leadgenId) {

      return NextResponse.json({
        received: true,
      });

    }



    console.log(
      "META LEAD ID:",
      leadgenId
    );



    // momentan salvăm evenimentul
    // după ce confirmăm webhook-ul
    // adăugăm preluarea datelor complete


    const { error } = await supabase
      .from("leads")
      .insert({

        meta_lead_id: leadgenId,

        status: "nou",

        sursa: "facebook",

      });



    if (error) {

      console.log(
        "SUPABASE INSERT ERROR:",
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



    return NextResponse.json({

      success: true,

    });



  } catch (error) {


    console.log(
      "META WEBHOOK ERROR:",
      error
    );


    return NextResponse.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );

  }

}
