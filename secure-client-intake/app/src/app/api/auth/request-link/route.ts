import { NextResponse } from "next/server";
import { createMagicLink } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, message: "Valid email required" }, { status: 400 });
    }

    const token = await createMagicLink(email);
    const base = process.env.APP_BASE_URL || "http://localhost:3000";
    const link = `${base}/api/auth/verify?token=${encodeURIComponent(token)}`;

    // TODO: Send via secure transactional email provider. Avoid logging full link in production logs.
    await writeAudit({
      actorType: "system",
      actorId: "api",
      action: "magic_link_created",
      resourceType: "intake_magic_link",
      resourceId: email.toLowerCase(),
      metadata: { email: email.toLowerCase() },
    });

    return NextResponse.json({ ok: true, message: "Magic link created", devLink: link });
  } catch {
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
