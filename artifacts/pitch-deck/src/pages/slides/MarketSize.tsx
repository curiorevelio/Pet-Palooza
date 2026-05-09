export default function MarketSize() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body text-text px-[6vw] py-[5vh] flex flex-col">
      <div className="flex items-center justify-between border-b border-text/10 pb-[2vh]">
        <div className="flex items-center gap-[0.8vw]">
          <div className="w-[1.8vw] h-[1.8vw] rounded-full bg-primary" />
          <div className="font-display font-semibold text-[1.5vw]">PawHub</div>
        </div>
        <div className="font-body text-[1.5vw] font-semibold text-muted tracking-[0.18em] uppercase">
          05 · Market Size
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-[3vw] pt-[5vh]">
        <div className="col-span-5 flex flex-col justify-center">
          <div className="font-display text-primary text-[1.5vw] font-semibold uppercase tracking-[0.15em] mb-[2vh]">
            TAM · SAM · SOM
          </div>
          <h1 className="font-display font-bold text-[4.4vw] leading-[1.05] tracking-tight">
            A $1.9B prize, with a clear wedge.
          </h1>
          <p className="font-body text-[1.7vw] text-text/80 mt-[2.5vh] leading-snug">
            We start with on-demand services in three metros and compound from there.
          </p>
        </div>

        <div className="col-span-7 flex flex-col justify-center gap-[2.5vh]">
          <div className="relative">
            <div className="bg-soft rounded-[1.4vw] py-[3.5vh] pl-[3vw] pr-[2vw] w-full flex items-center justify-between">
              <div>
                <div className="font-display font-semibold text-primary text-[1.5vw] uppercase tracking-[0.15em]">TAM</div>
                <div className="font-body text-[1.6vw] text-text/80 mt-[0.5vh]">India pet services & care market by 2030</div>
              </div>
              <div className="font-display font-bold text-primary text-[5vw] leading-none">$1.9B</div>
            </div>
          </div>

          <div className="relative pl-[6vw]">
            <div className="bg-accent/15 rounded-[1.4vw] py-[3vh] pl-[3vw] pr-[2vw] w-full flex items-center justify-between">
              <div>
                <div className="font-display font-semibold text-accent text-[1.5vw] uppercase tracking-[0.15em]">SAM</div>
                <div className="font-body text-[1.5vw] text-text/80 mt-[0.5vh]">On-demand pet services across India's top 8 metros</div>
              </div>
              <div className="font-display font-bold text-accent text-[4vw] leading-none">$450M</div>
            </div>
          </div>

          <div className="relative pl-[12vw]">
            <div className="bg-text rounded-[1.4vw] py-[2.5vh] pl-[3vw] pr-[2vw] w-full flex items-center justify-between text-bg">
              <div>
                <div className="font-display font-semibold text-primary text-[1.5vw] uppercase tracking-[0.15em]">SOM · Yr 3</div>
                <div className="font-body text-[1.5vw] text-bg/85 mt-[0.5vh]">5% capture of Bangalore + Mumbai + Delhi NCR on-demand bookings</div>
              </div>
              <div className="font-display font-bold text-primary text-[3.4vw] leading-none">$25M</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
