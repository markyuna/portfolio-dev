"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";

interface ClaudePromptOutputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onRegenerate: () => void;
}

export default function ClaudePromptOutput({
  prompt,
  onPromptChange,
  onRegenerate,
}: ClaudePromptOutputProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(prompt);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = prompt;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — user can still select and copy manually.
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onRegenerate}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <RefreshCw className="h-4 w-4" />
          Régénérer
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copié" : "Copier"}
        </button>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        rows={24}
        className="w-full resize-y rounded-2xl border border-white/10 bg-white/5 p-5 font-mono text-xs leading-6 text-white/85 outline-none transition focus:border-violet-400/60 focus:bg-white/10"
      />
    </div>
  );
}
