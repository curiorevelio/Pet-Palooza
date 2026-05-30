import { useState } from "react";
import { useRoute, Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { practitioners, letters } from "@/data";
import { ArrowLeft } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function PractitionerDetail() {
  const [match, params] = useRoute("/practitioner/:id");
  const [inquirySent, setInquirySent] = useState(false);

  const practitioner = practitioners.find(p => p.id === params?.id);
  const practitionerLetters = letters.filter(l => l.practitionerId === params?.id);

  usePageMeta(
    practitioner ? `${practitioner.name} · Pawhub` : "Practitioner not found · Pawhub",
    practitioner
      ? `${practitioner.name} — ${practitioner.craft} in ${practitioner.neighborhood}. ${practitioner.bio?.slice(0, 140) ?? "A trusted name in the Pawhub register."}`
      : "This practitioner could not be found in the Pawhub register.",
  );

  if (!match || !practitioner) {
    return (
      <PageLayout>
        <div className="px-6 py-32 text-center">
          <p className="text-2xl italic mb-6">Practitioner not found.</p>
          <Link href="/directory" className="text-sm underline underline-offset-4">Return to directory</Link>
        </div>
      </PageLayout>
    );
  }

  const handleInquire = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 5000);
  };

  return (
    <PageLayout>
      <div className="px-6 md:px-12 py-16 animate-in fade-in duration-700">
        <Link href="/directory" className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#1a1613]/50 font-sans hover:text-[#1a1613] transition-colors mb-16">
          <ArrowLeft className="w-3 h-3" /> Back to register
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7">
            <h1 className="text-5xl md:text-7xl font-light italic mb-8">{practitioner.name}</h1>
            
            <div className="flex flex-wrap items-baseline gap-6 mb-16 border-b border-[#1a1613]/15 pb-8">
              <span className="text-[11px] tracking-[0.3em] uppercase font-sans text-[#1a1613]">{practitioner.craft}</span>
              <span className="text-lg italic text-[#1a1613]/70">of {practitioner.neighborhood}</span>
              <span className="text-sm font-light text-[#1a1613]/60">• {practitioner.yearsOfPractice} years in practice</span>
            </div>

            <div className="prose prose-stone prose-lg max-w-none text-[#1a1613]/85 mb-16">
              <p className="text-2xl leading-relaxed font-light first-letter:text-[64px] first-letter:float-left first-letter:leading-[0.85] first-letter:mr-3 first-letter:mt-1 first-letter:font-normal">
                {practitioner.bio}
              </p>
            </div>

            <div className="mb-24">
              <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/55 font-sans mb-8">
                Offered Services
              </h3>
              <ul className="space-y-4">
                {practitioner.services.map((service, idx) => (
                  <li key={idx} className="text-xl italic border-b border-[#1a1613]/10 pb-4 last:border-0">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {practitionerLetters.length > 0 && (
              <div>
                <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/55 font-sans mb-10">
                  Selected Letters
                </h3>
                <div className="space-y-12">
                  {practitionerLetters.map(letter => (
                    <blockquote key={letter.id} className="pl-6 border-l border-[#1a1613]/20">
                      <p className="text-xl leading-relaxed font-light mb-4">"{letter.text}"</p>
                      <footer className="text-[11px] tracking-[0.2em] uppercase font-sans text-[#1a1613]/60">
                        — {letter.author}, {letter.context}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-12 bg-[#f6f1e7] border border-[#1a1613]/15 p-8 md:p-12">
              <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/80 font-sans mb-6">
                Express Interest
              </h3>
              <p className="text-base font-light text-[#1a1613]/70 mb-10 leading-relaxed">
                Send a quiet inquiry to {practitioner.name.split(" ")[0]}. They check correspondence once daily and will reply if they have capacity in their schedule.
              </p>

              {inquirySent ? (
                <div className="py-8 text-center animate-in fade-in">
                  <p className="text-lg italic text-[#1a1613]">Your letter has been placed in their tray.</p>
                  <p className="text-sm text-[#1a1613]/50 mt-4 font-light">They will write back if space allows.</p>
                </div>
              ) : (
                <form onSubmit={handleInquire} className="space-y-8">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-[#1a1613]/60 font-sans mb-2">Your Name</label>
                    <input required type="text" className="w-full bg-transparent border-b border-[#1a1613]/20 pb-2 focus:outline-none focus:border-[#1a1613]/60 text-lg transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-[#1a1613]/60 font-sans mb-2">Email for Reply</label>
                    <input required type="email" className="w-full bg-transparent border-b border-[#1a1613]/20 pb-2 focus:outline-none focus:border-[#1a1613]/60 text-lg transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-[#1a1613]/60 font-sans mb-2">A brief note</label>
                    <textarea required rows={4} className="w-full bg-transparent border-b border-[#1a1613]/20 pb-2 focus:outline-none focus:border-[#1a1613]/60 text-lg transition-colors resize-none placeholder:text-[#1a1613]/30 placeholder:italic" placeholder="Tell them about your dog..."></textarea>
                  </div>
                  <button type="submit" className="text-[11px] tracking-[0.3em] uppercase font-sans border border-[#1a1613]/30 px-6 py-3 hover:bg-[#1a1613] hover:text-[#f6f1e7] transition-colors w-full">
                    Fold & Send
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}