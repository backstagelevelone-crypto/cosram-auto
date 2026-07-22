export async function GET() {
  return new Response("Meta feed OK", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
