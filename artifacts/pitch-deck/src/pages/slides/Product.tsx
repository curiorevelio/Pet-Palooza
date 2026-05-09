export default function Product() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body text-text px-[6vw] py-[5vh] flex flex-col">
      <div className="flex items-center justify-between border-b border-text/10 pb-[2vh]">
        <div className="flex items-center gap-[0.8vw]">
          <div className="w-[1.8vw] h-[1.8vw] rounded-full bg-primary" />
          <div className="font-display font-semibold text-[1.5vw]">PawHub</div>
        </div>
        <div className="font-body text-[1.5vw] font-semibold text-muted tracking-[0.18em] uppercase">
          06 · Product
        </div>
      </div>

      <div className="pt-[4vh]">
        <div className="font-display text-primary text-[1.5vw] font-semibold uppercase tracking-[0.15em] mb-[1.5vh]">
          Built for pet parents
        </div>
        <h1 className="font-display font-bold text-[4.6vw] leading-[1.05] tracking-tight">
          One app. Every pet need.
        </h1>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-[3vw] pt-[5vh] items-center">
        <div className="flex flex-col items-center">
          <div className="bg-card rounded-[2vw] border border-text/10 shadow-[0_1.5vw_3vw_rgba(42,42,61,0.08)] w-[22vw] h-[46vh] p-[3vh_1.8vw] flex flex-col">
            <div className="font-display font-semibold text-[1.6vw] text-text mb-[2vh]">
              Book a service
            </div>
            <div className="bg-soft rounded-[1vw] p-[2vh_1.4vw] mb-[1.4vh]">
              <div className="font-display font-semibold text-[1.7vw] text-primary leading-none">Dog Walking</div>
              <div className="font-body text-[1.5vw] text-text/70 mt-[0.8vh]">30 min · ₹399</div>
            </div>
            <div className="bg-bg border border-text/10 rounded-[1vw] p-[2vh_1.4vw] mb-auto">
              <div className="font-display font-semibold text-[1.7vw] text-text leading-none">Vet on Call</div>
              <div className="font-body text-[1.5vw] text-text/70 mt-[0.8vh]">20 min · ₹599</div>
            </div>
            <div className="bg-primary text-bg text-center rounded-full py-[1.6vh] font-display font-semibold text-[1.6vw]">
              Book in 10 min
            </div>
          </div>
          <div className="font-display font-semibold text-[1.7vw] mt-[2vh]">Booking flow</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-card rounded-[2vw] border border-text/10 shadow-[0_1.5vw_3vw_rgba(42,42,61,0.08)] w-[22vw] h-[46vh] p-[3vh_1.8vw] flex flex-col">
            <div className="flex items-center gap-[1vw] mb-[2vh]">
              <div className="w-[4vw] h-[4vw] rounded-full bg-accent/30" />
              <div>
                <div className="font-display font-semibold text-[1.7vw] leading-none">Priya R.</div>
                <div className="font-body text-[1.5vw] text-text/70 mt-[0.5vh]">Verified · 4.9 ★</div>
              </div>
            </div>
            <div className="bg-soft rounded-[1vw] p-[2vh_1.4vw] mb-auto">
              <div className="font-body text-[1.5vw] text-text/85 leading-snug italic">
                "On time, gentle, and our pup loved her."
              </div>
              <div className="font-body text-[1.5vw] text-muted mt-[0.8vh]">— Aman G.</div>
            </div>
            <div className="bg-accent text-bg text-center rounded-full py-[1.6vh] font-display font-semibold text-[1.6vw] mt-[1.4vh]">
              View profile
            </div>
          </div>
          <div className="font-display font-semibold text-[1.7vw] mt-[2vh]">Provider profile</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-text rounded-[2vw] border border-text/10 shadow-[0_1.5vw_3vw_rgba(42,42,61,0.12)] w-[22vw] h-[46vh] p-[3vh_1.8vw] flex flex-col text-bg">
            <div className="flex items-center gap-[1vw] mb-[2vh]">
              <div className="w-[4vw] h-[4vw] rounded-full bg-primary" />
              <div>
                <div className="font-display font-semibold text-[1.7vw] leading-none">Biscuit</div>
                <div className="font-body text-[1.5vw] text-bg/70 mt-[0.5vh]">Golden · 3 yrs</div>
              </div>
            </div>
            <div className="bg-bg/10 rounded-[1vw] p-[2vh_1.4vw] mb-auto">
              <div className="font-body text-[1.5vw] text-bg/70">Walker arriving</div>
              <div className="font-display font-bold text-primary text-[3.4vw] leading-none mt-[0.8vh]">06:48</div>
              <div className="font-body text-[1.5vw] text-bg/70 mt-[0.8vh]">0.4 km away</div>
            </div>
            <div className="bg-primary text-bg text-center rounded-full py-[1.6vh] font-display font-semibold text-[1.6vw] mt-[1.4vh]">
              Track live
            </div>
          </div>
          <div className="font-display font-semibold text-[1.7vw] mt-[2vh]">Pet profile + ETA</div>
        </div>
      </div>
    </div>
  );
}
