export default function BusinessModel() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body text-text px-[6vw] py-[5vh] flex flex-col">
      <div className="flex items-center justify-between border-b border-text/10 pb-[2vh]">
        <div className="flex items-center gap-[0.8vw]">
          <div className="w-[1.8vw] h-[1.8vw] rounded-full bg-primary" />
          <div className="font-display font-semibold text-[1.5vw]">PawHub</div>
        </div>
        <div className="font-body text-[1.5vw] font-semibold text-muted tracking-[0.18em] uppercase">
          07 · Business Model
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-[3vw] pt-[5vh]">
        <div className="col-span-7 flex flex-col justify-center">
          <div className="font-display text-accent text-[1.5vw] font-semibold uppercase tracking-[0.15em] mb-[2vh]">
            Marketplace economics
          </div>
          <h1 className="font-display font-bold text-[5vw] leading-[1.02] tracking-tight">
            15–20% take-rate on every booking.
          </h1>

          <div className="grid grid-cols-2 gap-[1.5vw] mt-[5vh] max-w-[44vw]">
            <div className="bg-card rounded-[1.2vw] p-[2.5vh_1.5vw] border border-text/5 shadow-[0_0.8vw_2vw_rgba(42,42,61,0.05)]">
              <div className="font-body text-[1.5vw] text-muted uppercase tracking-[0.1em] font-semibold">Avg booking</div>
              <div className="font-display font-bold text-text text-[2.6vw] leading-none mt-[1vh]">₹500–1,500</div>
            </div>
            <div className="bg-card rounded-[1.2vw] p-[2.5vh_1.5vw] border border-text/5 shadow-[0_0.8vw_2vw_rgba(42,42,61,0.05)]">
              <div className="font-body text-[1.5vw] text-muted uppercase tracking-[0.1em] font-semibold">Take-rate</div>
              <div className="font-display font-bold text-primary text-[2.6vw] leading-none mt-[1vh]">17.5%</div>
              <div className="font-body text-[1.5vw] text-muted mt-[0.6vh]">blended</div>
            </div>
          </div>

          <div className="bg-text text-bg rounded-[1.2vw] p-[2.5vh_2vw] mt-[2vh] max-w-[44vw]">
            <div className="font-display font-semibold text-[1.7vw] leading-snug">
              Path to <span className="text-primary">₹100Cr ARR</span> by Year 3 at 5% city-level penetration.
            </div>
          </div>
        </div>

        <div className="col-span-5 flex flex-col justify-center">
          <div className="bg-card rounded-[1.4vw] p-[4vh_2vw] border border-text/5 shadow-[0_1vw_3vw_rgba(42,42,61,0.06)]">
            <div className="font-display font-semibold text-text text-[1.5vw] uppercase tracking-[0.1em] mb-[3vh]">
              The flow
            </div>

            <div className="flex flex-col gap-[2vh]">
              <div className="bg-bg rounded-[1vw] p-[2vh_1.5vw] border border-text/10 flex items-center justify-between">
                <div>
                  <div className="font-display font-semibold text-[1.5vw]">Pet Owner</div>
                  <div className="font-body text-[1.5vw] text-muted">Pays full booking</div>
                </div>
                <div className="font-display font-bold text-text text-[2vw]">100%</div>
              </div>

              <div className="flex items-center justify-center font-display text-primary text-[2.5vw] leading-none">↓</div>

              <div className="bg-primary rounded-[1vw] p-[2vh_1.5vw] text-bg flex items-center justify-between">
                <div>
                  <div className="font-display font-semibold text-[1.5vw]">PawHub</div>
                  <div className="font-body text-[1.5vw] text-bg/85">Marketplace fee</div>
                </div>
                <div className="font-display font-bold text-[2vw]">17.5%</div>
              </div>

              <div className="flex items-center justify-center font-display text-accent text-[2.5vw] leading-none">↓</div>

              <div className="bg-accent/15 rounded-[1vw] p-[2vh_1.5vw] flex items-center justify-between">
                <div>
                  <div className="font-display font-semibold text-[1.5vw] text-text">Provider</div>
                  <div className="font-body text-[1.5vw] text-text/70">Net payout</div>
                </div>
                <div className="font-display font-bold text-accent text-[2vw]">82.5%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
