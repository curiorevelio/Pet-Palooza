export default function Projections() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body text-text px-[6vw] py-[5vh] flex flex-col">
      <div className="flex items-center justify-between border-b border-text/10 pb-[2vh]">
        <div className="flex items-center gap-[0.8vw]">
          <div className="w-[1.8vw] h-[1.8vw] rounded-full bg-primary" />
          <div className="font-display font-semibold text-[1.5vw]">PawHub</div>
        </div>
        <div className="font-body text-[1.5vw] font-semibold text-muted tracking-[0.18em] uppercase">
          08 · Projected Numbers
        </div>
      </div>

      <div className="pt-[4vh]">
        <div className="font-display text-primary text-[1.5vw] font-semibold uppercase tracking-[0.15em] mb-[1.5vh]">
          Plan of record
        </div>
        <h1 className="font-display font-bold text-[4.6vw] leading-[1.02] tracking-tight">
          3-year financial trajectory.
        </h1>
      </div>

      <div className="flex-1 flex flex-col justify-center pt-[4vh]">
        <div className="bg-card rounded-[1.4vw] border border-text/5 shadow-[0_1vw_3vw_rgba(42,42,61,0.06)] overflow-hidden">
          <div className="grid grid-cols-4 bg-text text-bg">
            <div className="px-[2vw] py-[2.4vh] font-display font-semibold text-[1.5vw]"></div>
            <div className="px-[2vw] py-[2.4vh] font-display font-semibold text-[1.5vw] text-center uppercase tracking-[0.1em]">Yr 1</div>
            <div className="px-[2vw] py-[2.4vh] font-display font-semibold text-[1.5vw] text-center uppercase tracking-[0.1em]">Yr 2</div>
            <div className="px-[2vw] py-[2.4vh] font-display font-semibold text-[1.5vw] text-center uppercase tracking-[0.1em] bg-primary">Yr 3</div>
          </div>

          <div className="grid grid-cols-4 border-b border-text/10">
            <div className="px-[2vw] py-[2.4vh] font-display font-semibold text-[1.5vw] text-text">Cities</div>
            <div className="px-[2vw] py-[2.4vh] font-body text-[1.6vw] text-center">1 (Bangalore)</div>
            <div className="px-[2vw] py-[2.4vh] font-body text-[1.6vw] text-center">4</div>
            <div className="px-[2vw] py-[2.4vh] font-body text-[1.6vw] text-center bg-soft/50">8</div>
          </div>

          <div className="grid grid-cols-4 border-b border-text/10">
            <div className="px-[2vw] py-[2.4vh] font-display font-semibold text-[1.5vw] text-text">Bookings / month</div>
            <div className="px-[2vw] py-[2.4vh] font-body text-[1.6vw] text-center">10K</div>
            <div className="px-[2vw] py-[2.4vh] font-body text-[1.6vw] text-center">150K</div>
            <div className="px-[2vw] py-[2.4vh] font-display font-bold text-[1.8vw] text-center bg-soft/50 text-primary">800K</div>
          </div>

          <div className="grid grid-cols-4 border-b border-text/10">
            <div className="px-[2vw] py-[2.4vh] font-display font-semibold text-[1.5vw] text-text">GMV</div>
            <div className="px-[2vw] py-[2.4vh] font-body text-[1.6vw] text-center">₹6 Cr</div>
            <div className="px-[2vw] py-[2.4vh] font-body text-[1.6vw] text-center">₹120 Cr</div>
            <div className="px-[2vw] py-[2.4vh] font-display font-bold text-[1.8vw] text-center bg-soft/50 text-primary">₹720 Cr</div>
          </div>

          <div className="grid grid-cols-4">
            <div className="px-[2vw] py-[2.4vh] font-display font-semibold text-[1.5vw] text-text">Revenue (17.5%)</div>
            <div className="px-[2vw] py-[2.4vh] font-body text-[1.6vw] text-center">₹1 Cr</div>
            <div className="px-[2vw] py-[2.4vh] font-body text-[1.6vw] text-center">₹21 Cr</div>
            <div className="px-[2vw] py-[2.4vh] font-display font-bold text-[1.8vw] text-center bg-soft/50 text-primary">₹126 Cr</div>
          </div>
        </div>
      </div>
    </div>
  );
}
