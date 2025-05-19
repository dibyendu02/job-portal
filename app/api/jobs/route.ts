// app/api/jobs/route.ts
import jobs from "@/data/jobs.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  return Response.json(jobs.slice(start, end));
}
