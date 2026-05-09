export function EditorialQuiet() {
  const services = [
    { n: "01", name: "Walking", note: "Daily loops, weather respected, leash matched to temperament." },
    { n: "02", name: "Sitting", note: "An attentive guest who keeps the routine intact while you're away." },
    { n: "03", name: "Grooming", note: "Coat, claws, and ears, considered as a whole rather than a checklist." },
    { n: "04", name: "Bathing", note: "Warm water, gentle product, towels that have already been warmed." },
    { n: "05", name: "Training", note: "Patient repetition, in your home, on your animal's terms." },
  ];

  const directory = [
    { name: "Maya Calderón", craft: "Walker", neighborhood: "Mission" },
    { name: "Idris Halcyon", craft: "Sitter", neighborhood: "Bernal Heights" },
    { name: "Noor Petrov", craft: "Groomer", neighborhood: "Hayes Valley" },
    { name: "Étienne Ward", craft: "Trainer", neighborhood: "Outer Sunset" },
    { name: "Saoirse Lin", craft: "Bather", neighborhood: "Inner Richmond" },
  ];

  return (
    <div
      className="min-h-screen bg-[#f6f1e7] text-[#1a1613]"
      style={{
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        fontFeatureSettings: "'liga' 1, 'kern' 1",
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Inter:wght@400;500&display=swap"
      />

      <header className="px-12 pt-10 pb-6 border-b border-[#1a1613]/15">
        <div className="flex items-baseline justify-between">
          <div
            className="text-[11px] tracking-[0.32em] uppercase"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Pawhub &nbsp;·&nbsp; Vol. I
          </div>
          <nav
            className="flex gap-10 text-[11px] tracking-[0.28em] uppercase"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <span>Index</span>
            <span>Practitioners</span>
            <span>Letters</span>
            <span className="underline underline-offset-4">Enter</span>
          </nav>
        </div>
      </header>

      <section className="px-12 pt-24 pb-32">
        <div className="max-w-3xl">
          <div
            className="text-[10px] tracking-[0.4em] uppercase mb-10 text-[#1a1613]/60"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            A quiet directory of people who care for animals.
          </div>
          <h1 className="text-[88px] leading-[0.95] font-light tracking-tight">
            Of dogs,
            <br />
            and the people
            <br />
            <em className="italic font-light">who walk them</em>.
          </h1>
          <p className="mt-12 text-2xl leading-[1.55] font-light text-[#1a1613]/85 max-w-xl">
            Pawhub is not an app of urgency. It is a small register of trusted
            walkers, sitters, groomers, and trainers — written down, vouched for,
            and offered without performance.
          </p>
          <div className="mt-16 flex items-baseline gap-8">
            <a
              className="text-base italic underline underline-offset-[6px] decoration-[0.5px]"
              href="#"
            >
              Read the directory →
            </a>
            <span
              className="text-[11px] tracking-[0.3em] uppercase text-[#1a1613]/55"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              No accounts. No notifications.
            </span>
          </div>
        </div>
      </section>

      <div className="px-12">
        <hr className="border-0 border-t border-[#1a1613]/20" />
      </div>

      <section className="px-12 py-24">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-3">
            <div
              className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/55"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              § I — On the work
            </div>
          </div>
          <div className="col-span-9">
            <p
              className="text-[28px] leading-[1.5] font-light first-letter:text-[88px] first-letter:float-left first-letter:leading-[0.85] first-letter:mr-3 first-letter:mt-2 first-letter:font-normal"
            >
              The five practices we list are old. A walk is still a walk.
              A bath is still warm water and patience. We have nothing to
              add to them, only people to introduce.
            </p>
          </div>
        </div>
      </section>

      <section className="px-12 pb-24">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-3">
            <div
              className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/55"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              § II — The practices
            </div>
          </div>
          <div className="col-span-9 space-y-10">
            {services.map((s) => (
              <div
                key={s.n}
                className="grid grid-cols-12 gap-8 pb-8 border-b border-[#1a1613]/15 last:border-0"
              >
                <div
                  className="col-span-1 text-sm tracking-[0.2em] text-[#1a1613]/55 pt-3"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {s.n}
                </div>
                <div className="col-span-3 text-3xl italic font-light">
                  {s.name}
                </div>
                <div className="col-span-8 text-lg leading-relaxed font-light text-[#1a1613]/80">
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-12 py-24 border-t border-[#1a1613]/20">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-3">
            <div
              className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/55"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              § III — The directory
            </div>
            <p
              className="mt-6 text-xs leading-relaxed text-[#1a1613]/55"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Five names, by way of introduction. The full register is read
              one neighborhood at a time.
            </p>
          </div>
          <div className="col-span-9">
            <ol className="space-y-6">
              {directory.map((p, i) => (
                <li
                  key={p.name}
                  className="flex items-baseline gap-6 text-2xl font-light"
                >
                  <span
                    className="text-xs tabular-nums text-[#1a1613]/45 w-6"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="italic">{p.name}</span>
                  <span
                    className="text-[11px] tracking-[0.3em] uppercase text-[#1a1613]/50"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {p.craft}
                  </span>
                  <span className="text-base text-[#1a1613]/65 ml-auto italic">
                    of {p.neighborhood}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-12 py-32 border-t border-[#1a1613]/20">
        <blockquote className="max-w-3xl mx-auto text-center">
          <p className="text-4xl leading-[1.4] font-light italic">
            “She arrived ten minutes early, sat on the floor, and let the dog
            decide. By the time we left, the leash was an afterthought.”
          </p>
          <footer
            className="mt-10 text-[11px] tracking-[0.32em] uppercase text-[#1a1613]/55"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            — A. Whitfield, on her first walker
          </footer>
        </blockquote>
      </section>

      <footer className="px-12 py-10 border-t border-[#1a1613]/20 flex items-baseline justify-between">
        <div
          className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/55"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Pawhub &nbsp;·&nbsp; Printed in good faith.
        </div>
        <div
          className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/55"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Colophon
        </div>
      </footer>
    </div>
  );
}
