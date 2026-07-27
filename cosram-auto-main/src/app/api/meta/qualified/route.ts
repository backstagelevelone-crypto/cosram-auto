import { createHash } from "crypto";

const sha256 = (value: string) =>
  createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");

export async function POST(req: Request) {
  try {
    const { email, phone } = await req.json();

    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "system_generated",
          user_data: {
            em: email ? [sha256(email)] : undefined,
            ph: phone ? [sha256(phone)] : undefined,
          },
          custom_data: {
            lead_status: "qualified",
          },
        },
      ],
    };

    const response = await fetch(
      `https://graph.facebook.com/v23.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    return Response.json(result);
  } catch (error) {
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
