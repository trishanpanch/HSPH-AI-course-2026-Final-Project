import { createHash, timingSafeEqual } from "node:crypto";
export function authenticate(
  header: string | null,
  username = process.env.CLASS_DEMO_USERNAME || "class",
  password = process.env.CLASS_DEMO_PASSWORD,
): "ok" | "missing" | "unauthorized" {
  if (!password) return "missing";
  if (!header?.startsWith("Basic ")) return "unauthorized";
  try {
    const actual = Buffer.from(header.slice(6), "base64").toString("utf8");
    const digest = (s: string) => createHash("sha256").update(s).digest();
    return timingSafeEqual(digest(actual), digest(`${username}:${password}`))
      ? "ok"
      : "unauthorized";
  } catch {
    return "unauthorized";
  }
}
export function authResponse(header: string | null): Response | null {
  const status = authenticate(header);
  if (status === "ok") return null;
  return new Response(
    status === "missing"
      ? "The class password is not configured."
      : "Enter the shared class username and password.",
    {
      status: status === "missing" ? 503 : 401,
      headers: {
        "WWW-Authenticate":
          'Basic realm="CHLD Adapt class demo", charset="UTF-8"',
        "Cache-Control": "no-store",
      },
    },
  );
}
