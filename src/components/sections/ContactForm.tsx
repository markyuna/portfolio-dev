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
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-[2.5rem] border border-indigo-200/70 bg-white/55 p-10 text-center shadow-2xl shadow-indigo-950/10 backdrop-blur-xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100/70 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-6 text-2xl font-semibold tracking-[-0.05em] text-zinc-950">
          {f.success}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-600">
          {f.successSub}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2.5rem] border border-indigo-200/70 bg-white/55 p-6 shadow-2xl shadow-indigo-950/10 backdrop-blur-xl md:p-8"
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100/70 text-violet-600">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-950">{f.projectRequest}</p>
          <p className="text-sm text-zinc-500">{f.projectRequestSub}</p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-zinc-600">{f.name}</label>
          <input
            name="name"
            type="text"
            required
            placeholder={f.namePlaceholder}
            className="w-full rounded-2xl border border-indigo-200/70 bg-white/70 px-4 py-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-zinc-600">{f.email}</label>
          <input
            name="email"
            type="email"
            required
            placeholder={f.emailPlaceholder}
            className="w-full rounded-2xl border border-indigo-200/70 bg-white/70 px-4 py-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white"
          />
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-3 block text-sm text-zinc-600">
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
                  ? "border-violet-500 bg-violet-100/80 text-violet-700"
                  : "border-indigo-200/70 bg-white/60 text-zinc-600 hover:border-violet-400 hover:bg-white hover:text-violet-700",
              ].join(" ")}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm text-zinc-600">
          {f.projectLabel}
        </label>
        <input
          name="project"
          type="text"
          placeholder={f.projectPlaceholder}
          className="w-full rounded-2xl border border-indigo-200/70 bg-white/70 px-4 py-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white"
        />
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm text-zinc-600">{f.message}</label>
        <textarea
          name="message"
          rows={6}
          required
          placeholder={f.messagePlaceholder}
          className="w-full resize-none rounded-2xl border border-indigo-200/70 bg-white/70 px-4 py-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white"
        />
      </div>

      {status === "error" && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50/60 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:scale-[1.01] hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? f.sending : f.submit}
        <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
