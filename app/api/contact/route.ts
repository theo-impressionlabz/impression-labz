import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, company, answers } = await request.json();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Fail gracefully — still return 200 so UX isn't broken before the key is set
    console.error("RESEND_API_KEY not configured");
    return NextResponse.json({ ok: true });
  }

  const html = `
    <h2>New Strategy Call Request — Impression Labz</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Company:</strong> ${company}</p>
    <hr />
    <h3>Qualification Answers</h3>
    <p><strong>Role:</strong> ${answers?.role ?? "—"}</p>
    <p><strong>Biggest challenge:</strong> ${answers?.challenge ?? "—"}</p>
    <p><strong>Team size:</strong> ${answers?.size ?? "—"}</p>
    <p><strong>Timeline:</strong> ${answers?.timeline ?? "—"}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Impression Labz <onboarding@resend.dev>",
      to: ["theo@impressionlabz.com"],
      reply_to: email,
      subject: `New Lead: ${name} from ${company}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Resend error:", await res.text());
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
