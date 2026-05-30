import { PageLayout } from "@/components/layout/PageLayout";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function NotFound() {
  usePageMeta(
    "Not found · Pawhub",
    "This page has not been written in the register.",
  );

  return (
    <PageLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 animate-in fade-in">
        <h1 className="text-6xl italic font-light mb-6">Not Found</h1>
        <p className="text-xl text-[#1a1613]/70 font-light mb-10">
          This page has not been written in the register.
        </p>
        <Link href="/" className="text-[11px] tracking-[0.3em] uppercase font-sans border border-[#1a1613]/20 px-8 py-3 hover:bg-[#1a1613] hover:text-[#f6f1e7] transition-colors">
          Return to Index
        </Link>
      </div>
    </PageLayout>
  );
}