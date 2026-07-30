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

    const eventSourceUrl =
      body.event_source_url ||
      "https://www.cosram.ro";


    console.log("META QUALIFIED REQUEST V3", {
      email: !!email,
      phone: !!phone,
      fbp: !!fbp,
      fbc: !!fbc,
    });


    const user_data: Record<string, any> = {};


    if (email) {
      user_data.em = [
        sha256(email)
      ];
    }


    if (phone) {
      user_data.ph = [
        sha256(phone)
      ];
    }


    if (fbp) {
      user_data.fbp = fbp;
    }


    if (fbc) {
      user_data.fbc = fbc;
    }


    const pixelId = process.env.META_CRM_PIXEL_ID;
    const accessToken = process.env.META_CRM_ACCESS_TOKEN;


    if (!pixelId || !accessToken) {
      console.log("META ENV MISSING");

      return Response.json(
        {
          error: "META variables missing",
        },
        {
          status: 500,
        }
      );
    }


    const payload = {
      data: [
        {
          event_name: "QualifiedLead",

          event_time: Math.floor(
            Date.now() / 1000
          ),

          action_source: "website",

          event_source_url: eventSourceUrl,

          user_data,

          custom_data: {
            lead_status: "qualified",
          },

          test_event_code: "TEST24894",
        },
      ],
    };


    console.log(
      "META PAYLOAD V3",
      JSON.stringify(payload, null, 2)
    );


    const metaResponse = await fetch(
      `https://graph.facebook.com/v23.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      }
    );


    const metaResult =
      await metaResponse.json();


    console.log(
      "META RESPONSE V3",
      JSON.stringify(metaResult, null, 2)
    );


    return Response.json(
      metaResult,
      {
        status: metaResponse.status,
      }
    );


  } catch (error) {

    console.log(
      "META QUALIFIED ERROR",
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
