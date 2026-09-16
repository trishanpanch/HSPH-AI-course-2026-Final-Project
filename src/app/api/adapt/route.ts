import { modelRoute } from "@/lib/model";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  return modelRoute(request, "adapt");
}
