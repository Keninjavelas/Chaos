// POST /api/contact — Auxilium Digital Archive contact form.
//
// Server-side SMTP transport. All credentials come exclusively from
// environment variables (never hard-coded, never shipped to the client):
//
//   SMTP_HOST        e.g. smtp.gmail.com
//   SMTP_PORT        e.g. 587 (STARTTLS) or 465 (SMTPS)
//   SMTP_USER        authenticated sender account
//   SMTP_PASSWORD    app password / SMTP credential for SMTP_USER
//   SMTP_SECURE      "true" for port 465 SMTPS (optional; default: port 465)
//   CONTACT_TO_EMAIL recipient mailbox (optional; default aryankapoor0303@gmail.com)
//
// The visitor's submitted email is only ever used as Reply-To — the SMTP
// account is always the actual sender, so arbitrary user input can never
// spoof the From address.
//
// Success is reported only after the SMTP server accepts the message
// (transporter.sendMail resolves). HTTP 200 alone is never treated as
// delivery confirmation by the client.

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const DEFAULT_TO_EMAIL = "aryankapoor0303@gmail.com";

const MAX_LENGTHS = {
  name: 80,
  email: 120,
  subject: 150,
  message: 4000,
} as const;

// Upper bound on the raw request body (covers all four fields + JSON
// envelope). Requests beyond this are rejected before parsing.
const MAX_BODY_BYTES = 16_000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function fieldErrors(payload: ContactPayload): { field: string; message: string }[] {
  const errors: { field: string; message: string }[] = [];
  const check = (field: keyof typeof MAX_LENGTHS, label: string) => {
    const value = payload[field];
    if (!isNonEmptyString(value)) {
      errors.push({ field, message: `${label} is required.` });
      return;
    }
    const trimmed = value.trim();
    if (trimmed.length > MAX_LENGTHS[field]) {
      errors.push({ field, message: `${label} exceeds the maximum length of ${MAX_LENGTHS[field]} characters.` });
    }
  };

  check("name", "Name");
  check("email", "Email");
  check("subject", "Subject");
  check("message", "Message");

  const email = payload.email;
  if (isNonEmptyString(email) && email.trim().length <= MAX_LENGTHS.email && !EMAIL_RE.test(email.trim())) {
    errors.push({ field: "email", message: "Email address is not valid." });
  }

  return errors;
}

export async function POST(request: Request): Promise<NextResponse> {
  // 1. Oversized payload guard (before any parsing work).
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION", message: "Request body too large." },
      { status: 413 }
    );
  }

  // 2. Parse + validate.
  let payload: ContactPayload;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION", message: "Request body too large." },
        { status: 413 }
      );
    }
    payload = JSON.parse(raw) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "VALIDATION", message: "Request body is not valid JSON." },
      { status: 400 }
    );
  }

  const errors = fieldErrors(payload);
  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION", message: "Please correct the highlighted fields.", fields: errors },
      { status: 400 }
    );
  }

  const name = (payload.name as string).trim();
  const visitorEmail = (payload.email as string).trim();
  const subject = (payload.subject as string).trim();
  const message = (payload.message as string).trim();

  // 3. SMTP configuration — environment only.
  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO_EMAIL;

  if (!host || !portRaw || !user || !password) {
    // Configuration is incomplete — fail gracefully without exposing which
    // variable is missing or any credential material.
    console.error("[contact] SMTP configuration incomplete; message not sent.");
    return NextResponse.json(
      { ok: false, error: "MAIL_CONFIG", message: "Mail service is not configured." },
      { status: 503 }
    );
  }

  const port = Number(portRaw);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error("[contact] Invalid SMTP_PORT value.");
    return NextResponse.json(
      { ok: false, error: "MAIL_CONFIG", message: "Mail service is not configured." },
      { status: 503 }
    );
  }

  const secure = port === 465;

  // 4. Send through SMTP. Success is only reported after the remote server
  // accepts the message.
  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass: password },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates for Gmail SMTP
      },
    });

    await transporter.sendMail({
      from: user,
      to: toEmail,
      replyTo: visitorEmail,
      subject: `[Auxilium Portfolio] ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${visitorEmail}`,
        `Subject: ${subject}`,
        "",
        "--- Message ---",
        message,
        "",
        "--- End of message ---",
        "Sent from the Auxilium Digital Archive contact form.",
      ].join("\n"),
    });

    return NextResponse.json({ ok: true, message: "Message accepted by the mail server." });
  } catch (error) {
    // Never surface raw SMTP/server errors to the browser.
    console.error("[contact] SMTP delivery failed:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json(
      { ok: false, error: "MAIL_SEND_FAILED", message: "The message could not be sent. Please try again later." },
      { status: 502 }
    );
  }
}
