export default function Traction() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body text-text px-[6vw] py-[5vh] flex flex-col">
      <div className="flex items-center justify-between border-b border-text/10 pb-[2vh]">
        <div className="flex items-center gap-[0.8vw]">
          <div className="w-[1.8vw] h-[1.8vw] rounded-full bg-primary" />
          <div className="font-display font-semibold text-[1.5vw]">PawHub</div>
        </div>
        <div className="font-body text-[1.5vw] font-semibold text-muted tracking-[0.18em] uppercase">
          09 · Traction
        </div>
      </div>

      <div className="pt-[5vh]">
        <div className="font-display text-accent text-[1.5vw] font-semibold uppercase tracking-[0.15em] mb-[1.5vh]">
          Pre-launch signal
        </div>
        <h1 className="font-display font-bold text-[5vw] leading-[1.02] tracking-tight">
          Validated demand, day one.
        </h1>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-[2vw] pt-[6vh] items-stretch">
        <div className="bg-primary text-bg rounded-[1.4vw] p-[3vh_2vw] flex flex-col justify-between shadow-[0_1vw_3vw_rgba(242,120,75,0.18)]">
          <div className="font-display font-semibold text-[1.5vw] uppercase tracking-[0.1em] text-bg/85">Waitlist</div>
          <div className="font-display font-bold text-[8vw] leading-none">400</div>
          <div className="font-body text-[1.5vw] text-bg/90 leading-snug">
            users on the waitlist
          </div>
        </div>

        <div className="bg-card rounded-[1.4vw] p-[3vh_2vw] flex flex-col justify-between border border-text/5 shadow-[0_1vw_3vw_rgba(42,42,61,0.06)]">
          <div className="font-display font-semibold text-[1.5vw] uppercase tracking-[0.1em] text-muted">Willingness to pay</div>
          <div className="font-display font-bold text-text text-[5vw] leading-[0.95]">
            Captured per service
          </div>
          <div className="font-body text-[1.5vw] text-text/80 leading-snug">
            Real pricing data from real pet parents.
          </div>
        </div>

        <div className="bg-accent text-bg rounded-[1.4vw] p-[3vh_2vw] flex flex-col justify-between shadow-[0_1vw_3vw_rgba(111,184,154,0.2)]">
          <div className="font-display font-semibold text-[1.5vw] uppercase tracking-[0.1em] text-bg/85">Landing page</div>
          <div className="font-display font-bold text-[5vw] leading-[0.95]">
            Live & converting
          </div>
          <div className="font-body text-[1.5vw] text-bg/90 leading-snug">
            Validation landing page in market today.
          </div>
        </div>
      </div>

      <div className="mt-[3vh] font-display font-semibold text-[1.8vw] text-text">
        Real signal before a single booking.
      </div>
    </div>
  );
}
