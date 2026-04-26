// src/app/(site)/contact/page.tsx

export const metadata = {
    title: "Contact | Marcos Suarez",
    description:
      "Start a project with Marcos Suarez — premium websites, modern UX and high-end web experiences.",
  };
  
  export default function ContactPage() {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#070707] px-6 py-32 text-white">
        {/* background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.2),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.15),transparent_30%)]" />
  
        <section className="relative z-10 mx-auto max-w-6xl">
          {/* header */}
          <div className="mb-20 max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-orange-300">
              Contact
            </p>
  
            <h1 className="text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
              Let’s build something
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-200 bg-clip-text text-transparent">
                {" "}
                exceptional.
              </span>
            </h1>
  
            <p className="mt-8 text-lg leading-8 text-zinc-400">
              I help brands and businesses create premium digital experiences.
              Tell me about your project and let’s bring it to life.
            </p>
          </div>
  
          {/* content */}
          <div className="grid gap-12 lg:grid-cols-2">
            {/* left info */}
            <div className="space-y-10">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-white">
                  Email
                </h3>
                <p className="text-zinc-400">
                  marcossuarezr88@gmail.com
                </p>
              </div>
  
              <div>
                <h3 className="mb-3 text-lg font-semibold text-white">
                  Phone
                </h3>
                <p className="text-zinc-400">
                  +33 6 62 48 24 91
                </p>
              </div>
  
              <div>
                <h3 className="mb-3 text-lg font-semibold text-white">
                  Location
                </h3>
                <p className="text-zinc-400">Paris, France</p>
              </div>
  
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                <p className="text-sm text-zinc-400">
                  Typically responds within 24h. Available for freelance
                  projects, collaborations and long-term partnerships.
                </p>
              </div>
            </div>
  
            {/* right form */}
            <form className="space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-300"
                />
              </div>
  
              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-300"
                />
              </div>
  
              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Project
                </label>
                <input
                  type="text"
                  placeholder="Tell me briefly about your project"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-300"
                />
              </div>
  
              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="More details..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-300"
                />
              </div>
  
              <button
                type="submit"
                className="w-full rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition duration-300 hover:scale-[1.02] hover:bg-orange-400 hover:text-white"
              >
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }