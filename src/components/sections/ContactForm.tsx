"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Send, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const { t } = useLanguage();
  const f = t.contactPage.form;

  const [status, setStatus] = useState<Status>("idle");
  const [selectedType, setSelectedType] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      projectType: selectedType,
      project: (form.elements.namedItem("project") as HTMLInputElement).value,
      message: (
        form.elements.namedItem("message") as HTMLTextAreaElement
      ).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.ok) {
        setStatus("success");
      } else {
        setErrorMsg(result.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-6 text-2xl font-semibold tracking-[-0.05em] text-white">
          {f.success}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-7 text-white/55">
          {f.successSub}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{f.projectRequest}</p>
          <p className="text-sm text-white/50">{f.projectRequestSub}</p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white/60">{f.name}</label>
          <input
            name="name"
            type="text"
            required
            placeholder={f.namePlaceholder}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:bg-white/10"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/60">{f.email}</label>
          <input
            name="email"
            type="email"
            required
            placeholder={f.emailPlaceholder}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:bg-white/10"
          />
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-3 block text-sm text-white/60">
          {f.projectType}
        </label>
        <div className="flex flex-wrap gap-2">
          {f.projectTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                setSelectedType(type === selectedType ? "" : type)
              }
              className={[
                "rounded-full border px-4 py-2 text-sm transition",
                selectedType === type
                  ? "border-violet-400 bg-violet-500/20 text-violet-300"
                  : "border-white/10 bg-white/5 text-white/60 hover:border-violet-400/50 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm text-white/60">
          {f.projectLabel}
        </label>
        <input
          name="project"
          type="text"
          placeholder={f.projectPlaceholder}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:bg-white/10"
        />
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm text-white/60">{f.message}</label>
        <textarea
          name="message"
          rows={6}
          required
          placeholder={f.messagePlaceholder}
          className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:bg-white/10"
        />
      </div>

      {status === "error" && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition duration-300 hover:scale-[1.01] hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? f.sending : f.submit}
        <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
