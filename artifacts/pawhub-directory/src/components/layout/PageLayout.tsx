import { Link, useLocation } from "wouter";

export function PageLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 md:px-12 pt-10 pb-6 border-b border-[#1a1613]/15 shrink-0">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 md:gap-0">
          <Link href="/" className="text-[11px] tracking-[0.32em] uppercase font-sans hover:opacity-70 transition-opacity block">
            Pawhub &nbsp;·&nbsp; Vol. I
          </Link>
          <nav className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] tracking-[0.28em] uppercase font-sans">
            <Link href="/" className={location === "/" ? "opacity-50" : "hover:opacity-70 transition-opacity"}>
              Index
            </Link>
            <Link href="/directory" className={location === "/directory" || location.startsWith("/practitioner") ? "opacity-50" : "hover:opacity-70 transition-opacity"}>
              Practitioners
            </Link>
            <Link href="/letters" className={location === "/letters" ? "opacity-50" : "hover:opacity-70 transition-opacity"}>
              Letters
            </Link>
            <Link href="/directory" className="underline underline-offset-4 hover:opacity-70 transition-opacity">
              Enter
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        {children}
      </main>

      <footer className="px-6 md:px-12 py-10 border-t border-[#1a1613]/20 flex flex-col md:flex-row items-baseline justify-between gap-6 shrink-0 mt-auto">
        <div className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/55 font-sans">
          Pawhub &nbsp;·&nbsp; Printed in good faith.
        </div>
        <div className="text-[10px] tracking-[0.4em] uppercase text-[#1a1613]/55 font-sans">
          Set in Cormorant &amp; Inter
        </div>
      </footer>
    </div>
  );
}