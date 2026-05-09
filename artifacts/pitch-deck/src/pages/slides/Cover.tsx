export default function Cover() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body text-text">
      <div className="absolute top-0 right-0 w-[55vw] h-[80vh] bg-soft rounded-bl-[20vw]" />
      <div className="absolute -bottom-[8vw] -left-[6vw] w-[28vw] h-[28vw] rounded-full bg-accent/20" />
      <div className="absolute top-[12vh] left-[8vw] w-[6vw] h-[6vw] rounded-full bg-primary/15" />

      <div className="absolute top-[5vh] left-[5vw] flex items-center gap-[1vw]">
        <div className="w-[3vw] h-[3vw] rounded-full bg-primary flex items-center justify-center">
          <div className="w-[1.4vw] h-[1.4vw] rounded-full bg-bg" />
        </div>
        <div className="font-display text-[1.6vw] font-semibold tracking-tight">PawHub</div>
      </div>

      <div className="relative z-10 flex flex-col justify-center h-full px-[8vw]">
        <div className="text-primary font-display font-semibold uppercase tracking-[0.2em] text-[1.5vw] mb-[2vh]">
          Investor Brief · Series A
        </div>
        <h1 className="font-display font-bold text-[10vw] leading-[0.95] tracking-tight text-text">
          PawHub
        </h1>
        <p className="font-body text-[3vw] mt-[3vh] text-text/80 max-w-[55vw] leading-tight">
          India's 10-minute pet care app
        </p>
      </div>

      <div className="absolute bottom-[5vh] left-[8vw] right-[8vw] flex items-center justify-between border-t border-text/10 pt-[2vh]">
        <div className="font-body text-[1.5vw] font-semibold text-muted">
          Bangalore <span className="mx-[0.6vw] text-primary">·</span> 2026
        </div>
        <div className="font-body text-[1.5vw] text-muted">Confidential</div>
      </div>
    </div>
  );
}
