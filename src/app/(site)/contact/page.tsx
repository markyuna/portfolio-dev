import {
    ArrowUpRight,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    Sparkles,
  } from "lucide-react";
  
  export const metadata = {
    title: "Contact | Marcos Suarez",
    description:
      "Start a project with Marcos Suarez — premium websites, modern UX and high-end web experiences.",
  };
  
  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "marcossuarezr88@gmail.com",
      href: "mailto:marcossuarezr88@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+33 6 62 48 24 91",
      href: "tel:+33662482491",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Paris, France",
      href: null,
    },
  ];
  
  const projectTypes = [
    "Premium website",
    "Portfolio",
    "Landing page",
    "E-commerce",
    "Web app",
  ];
  
  export default function ContactPage() {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#f4f7ff] px-6 py-32 text-zinc-950">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(99,102,241,0.18),transparent_34%),radial-gradient(circle_at_85%_75%,rgba(168,85,247,0.14),transparent_36%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(79,70,229,0.08)_1px,transparent_1px),linear-gradient(to_right,rgba(79,70,229,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.16]" />
  
        <section className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-20 max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300/40 bg-white/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-zinc-700 shadow-2xl shadow-violet-500/10 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-violet-500" />
              Contact
            </div>
  
            <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.07em] text-zinc-950 md:text-7xl lg:text-8xl">
              Let’s build something{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                exceptional.
              </span>
            </h1>
  
            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl">
              I help brands, creators and businesses create premium digital
              experiences with clean development, refined UI and strong visual
              direction.
            </p>
          </div>
  
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-indigo-200/70 bg-white/55 p-7 shadow-2xl shadow-indigo-950/10 backdrop-blur-xl">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/40 bg-violet-100/70 text-violet-600">
                  <MessageCircle className="h-5 w-5" />
                </div>
  
                <h2 className="text-3xl font-semibold tracking-[-0.05em] text-zinc-950">
                  Tell me about your idea.
                </h2>
  
                <p className="mt-4 text-sm leading-7 text-zinc-600">
                  Available for freelance projects, collaborations and long-term
                  partnerships. I usually respond within 24 hours.
                </p>
              </div>
  
              <div className="grid gap-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;
  
                  const content = (
                    <div className="group flex items-center justify-between rounded-3xl border border-indigo-200/70 bg-white/55 p-5 shadow-xl shadow-indigo-950/5 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-violet-300/70 hover:bg-white/75">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100/70 text-violet-600">
                          <Icon className="h-5 w-5" />
                        </div>
  
                        <div>
                          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                            {item.label}
                          </p>
                          <p className="mt-1 text-sm font-medium text-zinc-800">
                            {item.value}
                          </p>
                        </div>
                      </div>
  
                      {item.href && (
                        <ArrowUpRight className="h-4 w-4 text-zinc-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-600" />
                      )}
                    </div>
                  );
  
                  return item.href ? (
                    <a key={item.label} href={item.href}>
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>
            </aside>
  
            <form className="rounded-[2.5rem] border border-indigo-200/70 bg-white/55 p-6 shadow-2xl shadow-indigo-950/10 backdrop-blur-xl md:p-8">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100/70 text-violet-600">
                  <Sparkles className="h-5 w-5" />
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
                  <label className="mb-2 block text-sm text-zinc-600">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-indigo-200/70 bg-white/70 px-4 py-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white"
                  />
                </div>
  
                <div>
                  <label className="mb-2 block text-sm text-zinc-600">
                    Email
                  </label>
                  <input
                    type="email"
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
                      className="cursor-pointer rounded-full border border-indigo-200/70 bg-white/60 px-4 py-2 text-sm text-zinc-600 transition hover:border-violet-400 hover:bg-white hover:text-violet-700"
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
                <label className="mb-2 block text-sm text-zinc-600">
                  Project
                </label>
                <input
                  type="text"
                  placeholder="Tell me briefly about your project"
                  className="w-full rounded-2xl border border-indigo-200/70 bg-white/70 px-4 py-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white"
                />
              </div>
  
              <div className="mt-5">
                <label className="mb-2 block text-sm text-zinc-600">
                  Message
                </label>
                <textarea
                  rows={6}
                  placeholder="What are you building? What do you need help with?"
                  className="w-full resize-none rounded-2xl border border-indigo-200/70 bg-white/70 px-4 py-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white"
                />
              </div>
  
              <button
                type="submit"
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:scale-[1.01] hover:bg-violet-600"
              >
                Send message
                <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }