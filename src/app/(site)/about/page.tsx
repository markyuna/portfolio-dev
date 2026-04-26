// src/app/(site)/about/page.tsx

export const metadata = {
    title: "About | Marcos Suarez",
    description: "Learn more about Marcos Suarez, web developer based in Paris.",
  };
  
  export default function AboutPage() {
    return (
      <main className="min-h-screen bg-[#070707] px-6 py-32 text-white">
        <section className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-orange-300">
            About
          </p>
  
          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
            I build premium web experiences with clean code and strong visual
            direction.
          </h1>
  
          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            I’m Marcos Suarez, a web developer based in Paris. I create modern,
            responsive and polished websites using Next.js, Tailwind CSS and
            motion-driven interfaces.
          </p>
        </section>
      </main>
    );
  }