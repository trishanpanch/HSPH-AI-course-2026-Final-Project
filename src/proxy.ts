import { NextRequest, NextResponse } from "next/server";
import { authResponse } from "./lib/auth";
export function proxy(request: NextRequest) {
  const denied = authResponse(request.headers.get("authorization"));
  if (denied) return denied;
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Frame-Options", "DENY");
  return response;
}
export const config = { matcher: ["/:path*"] };
