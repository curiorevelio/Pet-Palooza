export default function Solution() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body text-text px-[6vw] py-[5vh] flex flex-col">
      <div className="flex items-center justify-between border-b border-text/10 pb-[2vh]">
        <div className="flex items-center gap-[0.8vw]">
          <div className="w-[1.8vw] h-[1.8vw] rounded-full bg-primary" />
          <div className="font-display font-semibold text-[1.5vw]">PawHub</div>
        </div>
        <div className="font-body text-[1.5vw] font-semibold text-muted tracking-[0.18em] uppercase">
          03 · The Solution
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-[78vw]">
        <div className="font-display text-accent text-[1.5vw] font-semibold uppercase tracking-[0.15em] mb-[2vh]">
          One app. Every pet need.
        </div>
        <h1 className="font-display font-bold text-[6vw] leading-[1.02] tracking-tight">
          Book any pet service in 10 minutes.
        </h1>
        <p className="font-body text-[2.2vw] mt-[3vh] text-text/85 leading-snug max-w-[68vw]">
          PawHub is one app for every pet need — vetted providers, transparent pricing, in-app booking, and a 10-minute promise.
        </p>

        <div className="grid grid-cols-3 gap-[1.4vw] mt-[5vh] max-w-[72vw]">
          <div className="bg-card border border-primary/30 rounded-full px-[2vw] py-[2vh] text-center font-display font-semibold text-[1.7vw] text-text">
            Dog Walking
          </div>
          <div className="bg-primary text-bg rounded-full px-[2vw] py-[2vh] text-center font-display font-semibold text-[1.7vw]">
            Pet Sitting
          </div>
          <div className="bg-card border border-primary/30 rounded-full px-[2vw] py-[2vh] text-center font-display font-semibold text-[1.7vw] text-text">
            Grooming
          </div>
          <div className="bg-card border border-accent/40 rounded-full px-[2vw] py-[2vh] text-center font-display font-semibold text-[1.7vw] text-text">
            Dog Washing
          </div>
          <div className="bg-accent text-bg rounded-full px-[2vw] py-[2vh] text-center font-display font-semibold text-[1.7vw]">
            Training
          </div>
          <div className="bg-card border border-accent/40 rounded-full px-[2vw] py-[2vh] text-center font-display font-semibold text-[1.7vw] text-text">
            Vet on Call
          </div>
        </div>
      </div>
    </div>
  );
}
