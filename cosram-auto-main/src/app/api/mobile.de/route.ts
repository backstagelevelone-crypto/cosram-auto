import { NextResponse } from "next/server";

export async function GET() {
  const id = "454950323";

  const url = `https://suchen.mobile.de/fahrzeuge/details.html?id=${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          status: response.status,
        },
        { status: response.status }
      );
    }

    const html = await response.text();

    return NextResponse.json({
      success: true,
      id,
      htmlLength: html.length,
      message: "Pagina mobile.de a fost preluată.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Nu am putut accesa mobile.de",
      },
      { status: 500 }
    );
  }
}
