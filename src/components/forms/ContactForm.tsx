"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const projectTypes = [
  "Premium website",
  "Portfolio",
  "Landing page",
  "E-commerce",
  "Web app",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      projectType: formData.get("projectType"),
      project: formData.get("project"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2.5rem] border border-indigo-200/70 bg-white/55 p-6 shadow-2xl shadow-indigo-950/10 backdrop-blur-xl md:p-8"
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100/70 text-violet-600">
          <Send className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-950">
            Project request
          </p>
          <p className="text-sm text-zinc-500">
            Share a few details and I’ll get back to you.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-zinc-600">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full rounded-2xl border border-indigo-200/70 bg-white/70 px-4 py-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-zinc-600">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="w-full rounded-2xl border border-indigo-200/70 bg-white/70 px-4 py-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white"
          />
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-3 block text-sm text-zinc-600">
          Project type
        </label>

        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type) => (
            <label
              key={type}
              className="cursor-pointer rounded-full border border-indigo-200/70 bg-white/60 px-4 py-2 text-sm text-zinc-600 transition hover:border-violet-400 hover:bg-white hover:text-violet-700 has-[:checked]:border-violet-400 has-[:checked]:bg-white has-[:checked]:text-violet-700"
            >
              <input
                type="radio"
                name="projectType"
                value={type}
                className="sr-only"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="project" className="mb-2 block text-sm text-zinc-600">
          Project
        </label>
        <input
          id="project"
          name="project"
          type="text"
          placeholder="Tell me briefly about your project"
          className="w-full rounded-2xl border border-indigo-200/70 bg-white/70 px-4 py-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm text-zinc-600">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="What are you building? What do you need help with?"
          className="w-full resize-none rounded-2xl border border-indigo-200/70 bg-white/70 px-4 py-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:scale-[1.01] hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
        <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </button>

      {status === "success" && (
        <p className="mt-4 text-sm font-medium text-emerald-600">
          Thanks! Your message has been sent — I’ll get back to you soon.
        </p>
      )}

      {status === "error" && (
        <p className="mt-4 text-sm font-medium text-red-600">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
