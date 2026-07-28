import { createHash } from "crypto";

const sha256 = (value: string) =>
  createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");


export async function POST(req: Request) {
  try {
    const body = await req.json();


    const email = body.email || "";
    const phone = body.phone || "";

    const fbp = body.fbp || undefined;
    const fbc = body.fbc || undefined;

    const userAgent = body.user_agent || "";
    const eventSourceUrl = body.event_source_url || "";



    console.log("DATE PRIMITE META:", {
      hasEmail: !!email,
      hasPhone: !!phone,
      hasFbp: !!fbp,
      hasFbc: !!fbc,
    });



    const userData: Record<string, any> = {};


    if (email) {
      userData.em = [
        sha256(email)
      ];
    }


    if (phone) {
      userData.ph = [
        sha256(phone)
      ];
    }


    if (fbp) {
      userData.fbp = fbp;
    }


    if (fbc) {
      userData.fbc = fbc;
    }



    const payload = {
      data: [
        {
          event_name: "Lead",

          event_time: Math.floor(
            Date.now() / 1000
          ),

          action_source: "website",


          event_source_url: eventSourceUrl,


          user_data: userData,


          custom_data: {
            lead_status: "qualified",
          },


          test_event_code: "TEST94947",
        },
      ],
    };



    console.log(
      "META FULL PAYLOAD:",
      JSON.stringify(payload, null, 2)
    );



    const response = await fetch(
      `https://graph.facebook.com/v23.0/${process.env.META_CRM_PIXEL_ID}/events?access_token=${process.env.META_CRM_ACCESS_TOKEN}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      }
    );



    const result = await response.json();



    console.log(
      "META FULL RESPONSE:",
      JSON.stringify(result, null, 2)
    );



    return Response.json(result);


  } catch (error) {


    console.log(
      "META ERROR:",
      error
    );


    return Response.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );

  }
}
