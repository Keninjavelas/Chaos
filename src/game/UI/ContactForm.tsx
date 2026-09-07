"use client";

import React, { useState } from "react";

// Contact form for the Auxilium portfolio surfaces. Posts to the server-side
// /api/contact route (SMTP transport). Success is shown only after the server
// reports that the SMTP server accepted the message.

type FormState = "idle" | "submitting" | "success" | "error";

const MAX_LENGTHS = { name: 80, email: 120, subject: 150, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full border border-[#8fa08a]/40 bg-[#0a110a] px-3 py-2 text-sm text-[#d9e2d2] outline-none placeholder:text-[#8fa08a]/40 focus:border-[#8fa08a]";

const labelClass = "mb-1 block text-[10px] tracking-[0.25em] text-[#8fa08a]";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [clientError, setClientError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setClientError(null);

    // Client-side mirror of the server validation (server remains the
    // authority — this only gives immediate feedback).
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setClientError("ALL FIELDS REQUIRED");
      setState("error");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setClientError("EMAIL ADDRESS NOT VALID");
      setState("error");
      return;
    }
    if (
      name.trim().length > MAX_LENGTHS.name ||
      email.trim().length > MAX_LENGTHS.email ||
      subject.trim().length > MAX_LENGTHS.subject ||
      message.trim().length > MAX_LENGTHS.message
    ) {
      setClientError("FIELD EXCEEDS MAXIMUM LENGTH");
      setState("error");
      return;
    }

    setState("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() }),
      });
      const data = (await response.json().catch(() => null)) as { ok?: boolean } | null;
      // Only a server-confirmed SMTP accept counts as success.
      if (response.ok && data?.ok === true) {
        setState("success");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setClientError(
          data && "message" in data && typeof (data as { message?: unknown }).message === "string"
            ? ((data as { message: string }).message.toUpperCase())
            : "TRANSMISSION FAILED"
        );
        setState("error");
      }
    } catch {
      setClientError("TRANSMISSION FAILED — NO CONNECTION");
      setState("error");
    }
  };

  return (
    <div className="mt-5 border-t border-[#8fa08a]/25 pt-4">
      <div className="mb-3 text-[10px] tracking-[0.3em] text-[#8fa08a]">
        [ DIRECT TRANSMISSION — ARCHIVE CONTACT FORM ]
      </div>

      {state === "success" ? (
        <div className="border border-[#8fa08a]/50 bg-[#8fa08a]/10 px-4 py-3 text-center text-xs font-bold tracking-[0.2em] text-[#b9e0a8]">
          MESSAGE TRANSMITTED // RECEIVED BY THE MAIL SERVER
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3" noValidate>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                NAME
              </label>
              <input
                id="contact-name"
                className={inputClass}
                value={name}
                maxLength={MAX_LENGTHS.name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className={labelClass}>
                EMAIL
              </label>
              <input
                id="contact-email"
                type="email"
                className={inputClass}
                value={email}
                maxLength={MAX_LENGTHS.email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className={labelClass}>
              SUBJECT
            </label>
            <input
              id="contact-subject"
              className={inputClass}
              value={subject}
              maxLength={MAX_LENGTHS.subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What is this regarding?"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>
              MESSAGE
            </label>
            <textarea
              id="contact-message"
              className={`${inputClass} min-h-28 resize-y`}
              value={message}
              maxLength={MAX_LENGTHS.message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message…"
            />
          </div>

          {state === "error" && clientError ? (
            <div className="border border-[#a05a4a]/60 bg-[#a05a4a]/10 px-3 py-2 text-[11px] font-bold tracking-[0.2em] text-[#e0a090]">
              [ {clientError} ]
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              disabled={state === "submitting"}
              className="cursor-pointer border border-[#8fa08a] bg-[#8fa08a]/10 px-5 py-2 text-xs font-bold tracking-[0.2em] text-[#eaf2e6] hover:bg-[#8fa08a] hover:text-black disabled:cursor-wait disabled:opacity-60"
            >
              {state === "submitting" ? "TRANSMITTING…" : "SUBMIT MESSAGE"}
            </button>
            <div className="text-right text-[9px] leading-relaxed tracking-[0.2em] text-[#8fa08a]/50">
              SENT VIA THE ARCHIVE MAIL RELAY
              <br />
              DELIVERY CONFIRMED BY THE MAIL SERVER
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
