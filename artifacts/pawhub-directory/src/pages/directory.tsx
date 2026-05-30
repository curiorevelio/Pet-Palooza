import { useState, useMemo } from "react";
import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { practitioners, Craft } from "@/data";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function Directory() {
  usePageMeta(
    "The Register · Pawhub Directory",
    "The full register of trusted practitioners — walkers, sitters, groomers, bathers, and trainers. Read one neighborhood at a time; every name is verified before publishing.",
  );

  const [activeCraft, setActiveCraft] = useState<Craft | "All">("All");
  const [activeNeighborhood, setActiveNeighborhood] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const neighborhoods = useMemo(() => {
    const hoods = new Set(practitioners.map(p => p.neighborhood));
    return Array.from(hoods).sort();
  }, []);

  const crafts: (Craft | "All")[] = ["All", "Walker", "Sitter", "Groomer", "Bather", "Trainer"];

  const filteredPractitioners = useMemo(() => {
    return practitioners.filter(p => {
      const matchCraft = activeCraft === "All" || p.craft === activeCraft;
      const matchHood = activeNeighborhood === "All" || p.neighborhood === activeNeighborhood;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.bio.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCraft && matchHood && matchSearch;
    });
  }, [activeCraft, activeNeighborhood, searchQuery]);

  return (
    <PageLayout>
      <div className="px-6 md:px-12 py-16 md:py-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="max-w-3xl mb-24">
          <h1 className="text-5xl md:text-7xl leading-tight font-light italic mb-8">
            The Register
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed font-light text-[#1a1613]/80">
            Read one neighborhood at a time. We verify identities and speak with references before publishing any name.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <aside className="lg:col-span-3 space-y-12 lg:sticky lg:top-12">
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/55 font-sans mb-6">
                Search
              </div>
              <input
                type="text"
                placeholder="Name or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-[#1a1613]/20 pb-2 text-lg italic placeholder:text-[#1a1613]/30 focus:outline-none focus:border-[#1a1613]/50 transition-colors"
              />
            </div>

            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/55 font-sans mb-6">
                Practice
              </div>
              <div className="flex flex-col gap-3">
                {crafts.map(craft => (
                  <button
                    key={craft}
                    onClick={() => setActiveCraft(craft)}
                    className={`text-left text-base ${activeCraft === craft ? "italic" : "font-light text-[#1a1613]/60 hover:text-[#1a1613]"}`}
                  >
                    {craft}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/55 font-sans mb-6">
                Neighborhood
              </div>
              <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-4 scrollbar-thin">
                <button
                  onClick={() => setActiveNeighborhood("All")}
                  className={`text-left text-base ${activeNeighborhood === "All" ? "italic" : "font-light text-[#1a1613]/60 hover:text-[#1a1613]"}`}
                >
                  All Neighborhoods
                </button>
                {neighborhoods.map(hood => (
                  <button
                    key={hood}
                    onClick={() => setActiveNeighborhood(hood)}
                    className={`text-left text-base ${activeNeighborhood === hood ? "italic" : "font-light text-[#1a1613]/60 hover:text-[#1a1613]"}`}
                  >
                    {hood}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            {filteredPractitioners.length === 0 ? (
              <div className="py-20 text-center border-t border-[#1a1613]/15">
                <p className="text-xl italic text-[#1a1613]/50">No practitioners found matching these criteria.</p>
                <button 
                  onClick={() => { setActiveCraft("All"); setActiveNeighborhood("All"); setSearchQuery(""); }}
                  className="mt-6 text-sm underline underline-offset-4 decoration-[#1a1613]/30 text-[#1a1613]/70"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-16">
                {filteredPractitioners.map((p, i) => (
                  <div key={p.id} className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}>
                    <Link href={`/practitioner/${p.id}`} className="group block border-t border-[#1a1613]/15 pt-8 hover:opacity-80 transition-opacity">
                      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
                        <h2 className="text-3xl md:text-4xl italic group-hover:underline decoration-[0.5px] underline-offset-4">{p.name}</h2>
                        <div className="flex items-baseline gap-4 text-sm">
                          <span className="text-[11px] tracking-[0.3em] uppercase text-[#1a1613]/55 font-sans">{p.craft}</span>
                          <span className="italic text-[#1a1613]/70">of {p.neighborhood}</span>
                        </div>
                      </div>
                      <p className="text-lg leading-relaxed font-light text-[#1a1613]/80 max-w-2xl line-clamp-2">
                        {p.bio}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}