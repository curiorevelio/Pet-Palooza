import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { letters, practitioners } from "@/data";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function Letters() {
  usePageMeta(
    "Letters · Pawhub",
    "Collected letters from owners about the people who care for their animals — reader correspondence, printed in good faith.",
  );

  return (
    <PageLayout>
      <div className="px-6 md:px-12 py-16 md:py-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/55 font-sans mb-8">
            Reader Correspondence
          </div>
          <h1 className="text-5xl md:text-7xl leading-tight font-light italic mb-8">
            Letters & Notes
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed font-light text-[#1a1613]/80">
            A selection of dispatches from owners regarding the practitioners in our register. 
            Words of gratitude, printed exactly as received.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-24">
          {letters.map((letter, i) => {
            const practitioner = practitioners.find(p => p.id === letter.practitionerId);
            return (
              <article key={letter.id} className="animate-in fade-in slide-in-from-bottom-2 border-t border-[#1a1613]/15 pt-12" style={{ animationDelay: `${i * 150}ms`, animationFillMode: "both" }}>
                <div className="flex flex-col items-center text-center">
                  <p className="text-2xl md:text-3xl leading-[1.6] font-light mb-10 max-w-3xl">
                    "{letter.text}"
                  </p>
                  <footer className="flex flex-col items-center gap-4">
                    <div className="w-8 h-[1px] bg-[#1a1613]/20"></div>
                    <div className="text-[11px] tracking-[0.3em] uppercase font-sans text-[#1a1613]/70">
                      From {letter.author}
                    </div>
                    <div className="italic text-[#1a1613]/60 text-sm">
                      {letter.context}
                    </div>
                    {practitioner && (
                      <Link href={`/practitioner/${practitioner.id}`} className="mt-4 text-sm font-light text-[#1a1613]/50 hover:text-[#1a1613] underline underline-offset-4 decoration-[#1a1613]/30">
                        Regarding {practitioner.name}
                      </Link>
                    )}
                  </footer>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}