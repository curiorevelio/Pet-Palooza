export default function Team() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body text-text px-[6vw] py-[5vh] flex flex-col">
      <div className="flex items-center justify-between border-b border-text/10 pb-[2vh]">
        <div className="flex items-center gap-[0.8vw]">
          <div className="w-[1.8vw] h-[1.8vw] rounded-full bg-primary" />
          <div className="font-display font-semibold text-[1.5vw]">PawHub</div>
        </div>
        <div className="font-body text-[1.5vw] font-semibold text-muted tracking-[0.18em] uppercase">
          11 · Team
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-[3vw] pt-[5vh]">
        <div className="col-span-7 flex flex-col justify-center">
          <div className="font-display text-primary text-[1.5vw] font-semibold uppercase tracking-[0.15em] mb-[2vh]">
            Built inside Replit
          </div>
          <h1 className="font-display font-bold text-[5vw] leading-[1.02] tracking-tight">
            Backed by a 400-person team.
          </h1>
          <p className="font-body text-[1.8vw] text-text/85 mt-[3vh] leading-snug max-w-[44vw]">
            PawHub is incubated inside Replit — a 400-person team with the engineering, design, and operational firepower to execute on day one.
          </p>
        </div>

        <div className="col-span-5 flex flex-col justify-center gap-[2.5vh]">
          <div className="bg-card rounded-[1.4vw] p-[3vh_2vw] border border-text/5 shadow-[0_1vw_3vw_rgba(42,42,61,0.06)]">
            <div className="font-body text-[1.5vw] uppercase tracking-[0.15em] font-semibold text-muted mb-[1vh]">Parent company</div>
            <div className="flex items-center gap-[1.2vw]">
              <div className="w-[4vw] h-[4vw] rounded-[1vw] bg-text flex items-center justify-center">
                <div className="font-display font-bold text-bg text-[2vw]">R</div>
              </div>
              <div>
                <div className="font-display font-bold text-text text-[2.4vw] leading-none">Replit</div>
                <div className="font-body text-[1.5vw] text-muted mt-[0.6vh]">400-person team · global</div>
              </div>
            </div>
          </div>

          <div className="bg-primary text-bg rounded-[1.4vw] p-[3vh_2vw] shadow-[0_1vw_3vw_rgba(242,120,75,0.18)]">
            <div className="font-body text-[1.5vw] uppercase tracking-[0.15em] font-semibold text-bg/85 mb-[1vh]">Founder · Lead</div>
            <div className="flex items-center gap-[1.2vw]">
              <div className="w-[4vw] h-[4vw] rounded-full bg-bg flex items-center justify-center">
                <div className="font-display font-bold text-primary text-[2vw]">SA</div>
              </div>
              <div>
                <div className="font-display font-bold text-bg text-[2.4vw] leading-none">Syed Adil</div>
                <div className="font-body text-[1.5vw] text-bg/85 mt-[0.6vh]">Building PawHub from Bangalore</div>
              </div>
            </div>
          </div>

          <div className="bg-accent/15 rounded-[1.2vw] p-[2vh_2vw] grid grid-cols-3 gap-[1.5vw]">
            <div>
              <div className="font-display font-bold text-accent text-[2.4vw] leading-none">Eng</div>
              <div className="font-body text-[1.5vw] text-text/75 mt-[0.5vh]">Full-stack depth</div>
            </div>
            <div>
              <div className="font-display font-bold text-accent text-[2.4vw] leading-none">Design</div>
              <div className="font-body text-[1.5vw] text-text/75 mt-[0.5vh]">Brand & product</div>
            </div>
            <div>
              <div className="font-display font-bold text-accent text-[2.4vw] leading-none">Ops</div>
              <div className="font-body text-[1.5vw] text-text/75 mt-[0.5vh]">Marketplace muscle</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
