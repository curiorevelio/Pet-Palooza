export default function Ask() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body text-text px-[6vw] py-[5vh] flex flex-col">
      <div className="absolute top-0 right-0 w-[45vw] h-[60vh] bg-soft rounded-bl-[18vw]" />

      <div className="relative z-10 flex items-center justify-between border-b border-text/10 pb-[2vh]">
        <div className="flex items-center gap-[0.8vw]">
          <div className="w-[1.8vw] h-[1.8vw] rounded-full bg-primary" />
          <div className="font-display font-semibold text-[1.5vw]">PawHub</div>
        </div>
        <div className="font-body text-[1.5vw] font-semibold text-muted tracking-[0.18em] uppercase">
          12 · The Ask
        </div>
      </div>

      <div className="relative z-10 pt-[4vh]">
        <div className="font-display text-primary text-[1.5vw] font-semibold uppercase tracking-[0.15em] mb-[1.5vh]">
          The Ask
        </div>
        <h1 className="font-display font-bold text-[5.2vw] leading-[1.02] tracking-tight max-w-[78vw]">
          Raising <span className="text-primary">$1B</span> at a category-defining valuation.
        </h1>
      </div>

      <div className="relative z-10 flex-1 grid grid-cols-3 gap-[2vw] pt-[5vh] items-stretch">
        <div className="bg-card rounded-[1.4vw] p-[3vh_2vw] border border-text/5 shadow-[0_1vw_3vw_rgba(42,42,61,0.06)] flex flex-col">
          <div className="font-display font-bold text-primary text-[3vw] leading-none">01</div>
          <div className="font-display font-semibold text-text text-[1.8vw] mt-[2vh] leading-snug">
            Densest provider network
          </div>
          <div className="font-body text-[1.5vw] text-text/80 mt-[1.5vh] leading-snug">
            Build 500+ vetted providers in Bangalore.
          </div>
        </div>

        <div className="bg-card rounded-[1.4vw] p-[3vh_2vw] border border-text/5 shadow-[0_1vw_3vw_rgba(42,42,61,0.06)] flex flex-col">
          <div className="font-display font-bold text-accent text-[3vw] leading-none">02</div>
          <div className="font-display font-semibold text-text text-[1.8vw] mt-[2vh] leading-snug">
            Hit booking velocity
          </div>
          <div className="font-body text-[1.5vw] text-text/80 mt-[1.5vh] leading-snug">
            10K bookings/month within 12 months.
          </div>
        </div>

        <div className="bg-text text-bg rounded-[1.4vw] p-[3vh_2vw] flex flex-col">
          <div className="font-display font-bold text-primary text-[3vw] leading-none">03</div>
          <div className="font-display font-semibold text-bg text-[1.8vw] mt-[2vh] leading-snug">
            Expand to 4 metros
          </div>
          <div className="font-body text-[1.5vw] text-bg/85 mt-[1.5vh] leading-snug">
            Live in 4 cities by end of Year 2.
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-[3vh] font-display font-semibold text-[2.2vw] text-text leading-snug">
        Join us in building India's category-defining pet brand.
      </div>
    </div>
  );
}
