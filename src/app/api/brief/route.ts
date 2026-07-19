import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { buildBriefEmail } from "@/lib/brief-email";
import type { BriefPayload, LeadInfo, QuestionnaireAnswers } from "@/lib/questionnaire.types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidLead(lead: unknown): lead is LeadInfo {
  if (typeof lead !== "object" || lead === null) return false;
  const l = lead as Record<string, unknown>;
  return (
    typeof l.name === "string" &&
    l.name.trim().length > 0 &&
    typeof l.email === "string" &&
    EMAIL_RE.test(l.email.trim()) &&
    typeof l.company === "string" &&
    typeof l.phone === "string" &&
    l.consent === true
  );
}

function isValidAnswers(answers: unknown): answers is QuestionnaireAnswers {
  if (typeof answers !== "object" || answers === null) return false;
  return Object.values(answers).every(
    (value) =>
      typeof value === "string" ||
      (Array.isArray(value) && value.every((v) => typeof v === "string")),
  );
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { answers, lead, submittedAt } = body as Record<string, unknown>;

  if (!isValidAnswers(answers)) {
    return NextResponse.json(
      { ok: false, error: "Invalid questionnaire answers." },
      { status: 400 },
    );
  }

  if (!isValidLead(lead)) {
    return NextResponse.json(
      { ok: false, error: "Merci de renseigner un nom, un email valide et d'accepter l'utilisation de vos données." },
      { status: 400 },
    );
  }

  const payload: BriefPayload = {
    answers,
    lead,
    submittedAt: typeof submittedAt === "string" ? submittedAt : new Date().toISOString(),
  };

  const notificationEmail = process.env.BRIEF_NOTIFICATION_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!notificationEmail || !apiKey) {
    console.error("[brief] missing RESEND_API_KEY or BRIEF_NOTIFICATION_EMAIL env var");
    return NextResponse.json(
      { ok: false, error: "Le service d'envoi n'est pas configuré." },
      { status: 500 },
    );
  }

  const { subject, text, html } = buildBriefEmail(payload);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: notificationEmail,
      replyTo: payload.lead.email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[brief] resend error", error);
      return NextResponse.json(
        { ok: false, error: "L'envoi de l'email a échoué." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[brief] send failure", error);
    return NextResponse.json(
      { ok: false, error: "L'envoi de l'email a échoué." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
