export default function WhyNow() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body text-text px-[6vw] py-[5vh] flex flex-col">
      <div className="flex items-center justify-between border-b border-text/10 pb-[2vh]">
        <div className="flex items-center gap-[0.8vw]">
          <div className="w-[1.8vw] h-[1.8vw] rounded-full bg-primary" />
          <div className="font-display font-semibold text-[1.5vw]">PawHub</div>
        </div>
        <div className="font-body text-[1.5vw] font-semibold text-muted tracking-[0.18em] uppercase">
          04 · Why Now
        </div>
      </div>

      <div className="pt-[5vh]">
        <div className="font-display text-primary text-[1.5vw] font-semibold uppercase tracking-[0.15em] mb-[1.5vh]">
          Three tailwinds, one moment
        </div>
        <h1 className="font-display font-bold text-[4.6vw] leading-[1.05] tracking-tight max-w-[70vw]">
          Three tailwinds converging in India.
        </h1>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-[2vw] pt-[5vh]">
        <div className="bg-card rounded-[1.4vw] p-[3vh_2vw] border border-text/5 shadow-[0_1vw_3vw_rgba(42,42,61,0.06)] flex flex-col">
          <div className="w-[4vw] h-[4vw] rounded-full bg-soft flex items-center justify-center mb-[2vh]">
            <div className="w-[2vw] h-[2vw] rounded-full bg-primary" />
          </div>
          <div className="font-display font-bold text-[2vw] text-text mb-[1vh]">Pet Boom</div>
          <div className="font-display font-bold text-primary text-[2.6vw] leading-none mb-[1.5vh]">
            $800M → $1.9B
          </div>
          <div className="font-body text-[1.5vw] text-text/80 leading-snug">
            India pet care market: $800M (2024) → $1.9B by 2030 (~15% CAGR).
          </div>
        </div>

        <div className="bg-card rounded-[1.4vw] p-[3vh_2vw] border border-text/5 shadow-[0_1vw_3vw_rgba(42,42,61,0.06)] flex flex-col">
          <div className="w-[4vw] h-[4vw] rounded-full bg-accent/20 flex items-center justify-center mb-[2vh]">
            <div className="w-[2vw] h-[2vw] rounded-full bg-accent" />
          </div>
          <div className="font-display font-bold text-[2vw] text-text mb-[1vh]">Premium Pet Parents</div>
          <div className="font-display font-bold text-accent text-[2.6vw] leading-none mb-[1.5vh]">
            3–5x spend
          </div>
          <div className="font-body text-[1.5vw] text-text/80 leading-snug">
            Gen-Z & Millennials spending 3–5x more than the prior generation.
          </div>
        </div>

        <div className="bg-text text-bg rounded-[1.4vw] p-[3vh_2vw] flex flex-col">
          <div className="w-[4vw] h-[4vw] rounded-full bg-primary/30 flex items-center justify-center mb-[2vh]">
            <div className="font-display font-bold text-[1.5vw] text-bg">10m</div>
          </div>
          <div className="font-display font-bold text-[2vw] mb-[1vh]">10-min Expectations</div>
          <div className="font-display font-bold text-primary text-[2.6vw] leading-none mb-[1.5vh]">
            Instant default
          </div>
          <div className="font-body text-[1.5vw] text-bg/85 leading-snug">
            Zepto and Blinkit trained Bangalore to expect instant. Services are next.
          </div>
        </div>
      </div>

      <div className="mt-[3vh] font-body text-[1.5vw] text-muted italic">
        No category leader in India — Rover and Wag never entered.
      </div>
    </div>
  );
}
