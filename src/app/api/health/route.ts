export async function GET() {
  return Response.json(
    {
      status: "ok",
      app: "nextjs-vbox-lab",
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
