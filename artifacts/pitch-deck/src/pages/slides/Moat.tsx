export default function Moat() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-text text-bg font-body px-[6vw] py-[5vh] flex flex-col">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-primary/15 -translate-y-[15vw] translate-x-[10vw]" />
      <div className="absolute bottom-0 left-0 w-[28vw] h-[28vw] rounded-full bg-accent/15 translate-y-[10vw] -translate-x-[10vw]" />

      <div className="relative z-10 flex items-center justify-between border-b border-bg/15 pb-[2vh]">
        <div className="flex items-center gap-[0.8vw]">
          <div className="w-[1.8vw] h-[1.8vw] rounded-full bg-primary" />
          <div className="font-display font-semibold text-[1.5vw] text-bg">PawHub</div>
        </div>
        <div className="font-body text-[1.5vw] font-semibold text-bg/70 tracking-[0.18em] uppercase">
          10 · Moat
        </div>
      </div>

      <div className="relative z-10 flex-1 grid grid-cols-12 gap-[3vw] pt-[6vh]">
        <div className="col-span-7 flex flex-col justify-center">
          <div className="font-display text-primary text-[1.5vw] font-semibold uppercase tracking-[0.15em] mb-[2vh]">
            The 10-minute promise
          </div>
          <h1 className="font-display font-bold text-[6.4vw] leading-[1.0] tracking-tight">
            Zepto for pet services.
          </h1>

          <div className="flex flex-col gap-[2vh] mt-[5vh]">
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[1.4vw] h-[1.4vw] rounded-full bg-primary mt-[0.8vh] shrink-0" />
              <div className="font-body text-[1.8vw] text-bg/90 leading-snug">
                Hyper-dense provider network per pin code
              </div>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[1.4vw] h-[1.4vw] rounded-full bg-accent mt-[0.8vh] shrink-0" />
              <div className="font-body text-[1.8vw] text-bg/90 leading-snug">
                Quick-commerce ops playbook applied to services
              </div>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[1.4vw] h-[1.4vw] rounded-full bg-bg mt-[0.8vh] shrink-0" />
              <div className="font-body text-[1.8vw] text-bg/90 leading-snug">
                First-mover lock-in on supply
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-5 flex items-center justify-center">
          <div className="bg-bg text-text rounded-[1.6vw] p-[5vh_2.5vw] text-center w-full">
            <div className="font-display font-bold text-primary text-[7vw] leading-none">10</div>
            <div className="font-display font-semibold text-text text-[2vw] mt-[1vh]">minutes</div>
            <div className="w-[6vw] h-[2px] bg-text/15 mx-auto my-[2vh]" />
            <div className="font-display font-semibold text-text text-[1.6vw] leading-snug">
              Any service. Any pet.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
