export default function Problem() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body text-text px-[6vw] py-[5vh] flex flex-col">
      <div className="flex items-center justify-between border-b border-text/10 pb-[2vh]">
        <div className="flex items-center gap-[0.8vw]">
          <div className="w-[1.8vw] h-[1.8vw] rounded-full bg-primary" />
          <div className="font-display font-semibold text-[1.5vw]">PawHub</div>
        </div>
        <div className="font-body text-[1.5vw] font-semibold text-muted tracking-[0.18em] uppercase">
          02 · The Problem
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-[3vw] pt-[6vh]">
        <div className="col-span-7 flex flex-col justify-center">
          <div className="font-display text-primary text-[1.5vw] font-semibold uppercase tracking-[0.15em] mb-[2vh]">
            Pet care · India
          </div>
          <h1 className="font-display font-bold text-[5.4vw] leading-[1.02] tracking-tight max-w-[42vw]">
            Indian pet parents are stuck in WhatsApp groups.
          </h1>
        </div>

        <div className="col-span-5 flex flex-col justify-center gap-[2.2vh]">
          <div className="bg-card rounded-[1.4vw] p-[3vh_2vw] border border-text/5 shadow-[0_1vw_3vw_rgba(42,42,61,0.06)]">
            <div className="font-display font-bold text-primary text-[3vw] leading-none">32M+</div>
            <div className="font-body text-[1.5vw] mt-[1.2vh] text-text/85 leading-snug">
              pets in India — pet ownership has 2x'd in 5 years.
            </div>
          </div>
          <div className="bg-card rounded-[1.4vw] p-[3vh_2vw] border border-text/5 shadow-[0_1vw_3vw_rgba(42,42,61,0.06)]">
            <div className="font-display font-bold text-accent text-[2vw] leading-none">3 days</div>
            <div className="font-body text-[1.5vw] mt-[1.2vh] text-text/85 leading-snug">
              Finding a trusted dog walker, groomer, or vet means scrolling WhatsApp groups, begging neighbors, or waiting.
            </div>
          </div>
          <div className="bg-text rounded-[1.4vw] p-[3vh_2vw] text-bg">
            <div className="font-body text-[1.6vw] font-semibold leading-snug">
              No reliability. No transparency. No SLA. No trusted brand.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
