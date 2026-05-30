import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { services, practitioners, letters } from "@/data";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function Home() {
  usePageMeta(
    "Pawhub · A quiet directory of people who care for animals",
    "Pawhub is a small, vouched-for register of trusted walkers, sitters, groomers, bathers, and trainers — written down and offered without performance.",
  );

  const featuredPractitioners = practitioners.slice(0, 5);
  const featuredLetter = letters[0];

  return (
    <PageLayout>
      <section className="px-6 md:px-12 pt-24 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.4em] uppercase mb-10 text-[#1a1613]/60 font-sans">
            A quiet directory of people who care for animals.
          </div>
          <h1 className="text-[64px] md:text-[88px] leading-[0.95] font-light tracking-tight">
            Of dogs,
            <br />
            and the people
            <br />
            <em className="italic font-light">who walk them</em>.
          </h1>
          <p className="mt-12 text-xl md:text-2xl leading-[1.55] font-light text-[#1a1613]/85 max-w-xl">
            Pawhub is not an app of urgency. It is a small register of trusted
            walkers, sitters, groomers, and trainers — written down, vouched for,
            and offered without performance.
          </p>
          <div className="mt-16 flex flex-col sm:flex-row sm:items-baseline gap-6 sm:gap-8">
            <Link
              href="/directory"
              className="text-base italic underline underline-offset-[6px] decoration-[0.5px] hover:opacity-70 transition-opacity"
            >
              Read the directory →
            </Link>
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#1a1613]/55 font-sans">
              No accounts. No notifications.
            </span>
          </div>
        </div>
      </section>

      <div className="px-6 md:px-12">
        <hr className="border-0 border-t border-[#1a1613]/20" />
      </div>

      <section className="px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/55 font-sans">
              § I — On the work
            </div>
          </div>
          <div className="md:col-span-9">
            <p className="text-2xl md:text-[28px] leading-[1.5] font-light first-letter:text-[72px] md:first-letter:text-[88px] first-letter:float-left first-letter:leading-[0.85] first-letter:mr-3 first-letter:mt-2 first-letter:font-normal">
              The five practices we list are old. A walk is still a walk.
              A bath is still warm water and patience. We have nothing to
              add to them, only people to introduce.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/55 font-sans">
              § II — The practices
            </div>
          </div>
          <div className="md:col-span-9 space-y-10">
            {services.map((s) => (
              <div
                key={s.n}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pb-8 border-b border-[#1a1613]/15 last:border-0"
              >
                <div className="md:col-span-1 text-sm tracking-[0.2em] text-[#1a1613]/55 md:pt-3 font-sans">
                  {s.n}
                </div>
                <div className="md:col-span-3 text-3xl italic font-light">
                  {s.name}
                </div>
                <div className="md:col-span-8 text-lg leading-relaxed font-light text-[#1a1613]/80">
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 border-t border-[#1a1613]/20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/55 font-sans">
              § III — The directory
            </div>
            <p className="mt-6 text-xs leading-relaxed text-[#1a1613]/55 font-sans max-w-[200px]">
              Five names, by way of introduction. The full register is read
              one neighborhood at a time.
            </p>
          </div>
          <div className="md:col-span-9">
            <ol className="space-y-6">
              {featuredPractitioners.map((p, i) => (
                <li key={p.id}>
                  <Link
                    href={`/practitioner/${p.id}`}
                    className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 text-xl md:text-2xl font-light hover:opacity-70 transition-opacity"
                  >
                    <span className="text-xs tabular-nums text-[#1a1613]/45 w-6 font-sans hidden sm:inline-block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="italic group-hover:underline decoration-[0.5px] underline-offset-4">{p.name}</span>
                    <span className="text-[11px] tracking-[0.3em] uppercase text-[#1a1613]/50 font-sans">
                      {p.craft}
                    </span>
                    <span className="text-base text-[#1a1613]/65 sm:ml-auto italic">
                      of {p.neighborhood}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <div className="mt-16">
              <Link href="/directory" className="text-sm italic underline underline-offset-4 decoration-[0.5px] text-[#1a1613]/80 hover:text-[#1a1613]">
                View all practitioners →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-32 border-t border-[#1a1613]/20">
        <blockquote className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-4xl leading-[1.4] font-light italic">
            "{featuredLetter.text}"
          </p>
          <footer className="mt-10 flex flex-col items-center gap-4">
            <div className="text-[11px] tracking-[0.32em] uppercase text-[#1a1613]/55 font-sans">
              — {featuredLetter.author}, {featuredLetter.context}
            </div>
            <Link href="/letters" className="text-sm italic underline underline-offset-4 decoration-[0.5px] text-[#1a1613]/60 hover:text-[#1a1613]">
              Read more letters
            </Link>
          </footer>
        </blockquote>
      </section>
    </PageLayout>
  );
}