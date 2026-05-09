export function OperatorConsole() {
  const providers = [
    { id: "PRV-0142", name: "calderon.m",  svc: "WALK",  zone: "MIS-3", rate: "$28/hr", eta: "8m",  rtg: 4.97, jobs: 412, status: "AVAIL" },
    { id: "PRV-0089", name: "halcyon.i",   svc: "SIT",   zone: "BRN-1", rate: "$65/dy", eta: "—",   rtg: 4.92, jobs: 318, status: "BOOKED" },
    { id: "PRV-0231", name: "petrov.n",    svc: "GROOM", zone: "HAY-2", rate: "$72/svc", eta: "12m", rtg: 4.99, jobs: 267, status: "AVAIL" },
    { id: "PRV-0307", name: "ward.e",      svc: "TRAIN", zone: "SUN-4", rate: "$95/hr", eta: "22m", rtg: 4.88, jobs: 184, status: "AVAIL" },
    { id: "PRV-0411", name: "lin.s",       svc: "BATH",  zone: "RIC-2", rate: "$48/svc", eta: "9m",  rtg: 4.95, jobs: 521, status: "AVAIL" },
    { id: "PRV-0124", name: "okafor.j",    svc: "WALK",  zone: "MIS-1", rate: "$26/hr", eta: "14m", rtg: 4.84, jobs: 298, status: "AVAIL" },
    { id: "PRV-0356", name: "tanaka.r",    svc: "GROOM", zone: "PRE-2", rate: "$80/svc", eta: "31m", rtg: 4.91, jobs: 156, status: "OFF" },
  ];

  const log = [
    { t: "12:04:18", lvl: "INFO",  msg: "match.confirmed  job=#84210  prv=calderon.m  eta=8m" },
    { t: "12:04:11", lvl: "WARN",  msg: "queue.depth      svc=GROOM  zone=HAY-2  depth=3" },
    { t: "12:03:57", lvl: "INFO",  msg: "booking.created  pet=luna  svc=WALK  user=u_2914" },
    { t: "12:03:42", lvl: "INFO",  msg: "provider.online  prv=petrov.n  zone=HAY-2" },
    { t: "12:03:29", lvl: "OK",    msg: "review.posted    job=#84109  rating=5" },
    { t: "12:03:11", lvl: "INFO",  msg: "match.dispatched job=#84198  prv=lin.s  eta=9m" },
  ];

  const statusColor = (s: string) =>
    s === "AVAIL" ? "text-emerald-400"
    : s === "BOOKED" ? "text-amber-400"
    : "text-zinc-500";

  return (
    <div
      className="min-h-screen bg-[#0b0d0e] text-zinc-200 selection:bg-emerald-400/30"
      style={{
        fontFamily: "'JetBrains Mono', 'Menlo', ui-monospace, monospace",
        fontFeatureSettings: "'zero' 1, 'ss01' 1",
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
      />

      {/* top bar */}
      <header className="border-b border-zinc-800 px-4 h-10 flex items-center text-[11px]">
        <div className="flex items-center gap-2 mr-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-bold">PAWHUB::OPS</span>
          <span className="text-zinc-600">v0.4.1</span>
        </div>
        <nav className="flex gap-1 text-zinc-400">
          {["dispatch", "providers", "jobs", "pets", "ledger", "incidents"].map((t, i) => (
            <span
              key={t}
              className={
                "px-2.5 py-0.5 rounded-sm " +
                (i === 0 ? "bg-zinc-800 text-zinc-100" : "hover:bg-zinc-900")
              }
            >
              {t}
            </span>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4 text-zinc-500">
          <span>region: us-sf-01</span>
          <span>•</span>
          <span>uptime 14d 02:11</span>
          <span>•</span>
          <span className="text-emerald-400">● online</span>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-300">u_2914@home</span>
        </div>
      </header>

      {/* command bar */}
      <div className="border-b border-zinc-800 px-4 py-2 flex items-center gap-3 text-[12px]">
        <span className="text-zinc-600">$</span>
        <span className="text-zinc-100">book</span>
        <span className="text-emerald-400">--svc=walk</span>
        <span className="text-emerald-400">--pet=luna</span>
        <span className="text-emerald-400">--when=now</span>
        <span className="w-1.5 h-3.5 bg-emerald-400 animate-pulse ml-1" />
        <div className="ml-auto flex items-center gap-2 text-zinc-500">
          <span>press</span>
          <kbd className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-700 rounded-sm text-zinc-300">⌘</kbd>
          <kbd className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-700 rounded-sm text-zinc-300">K</kbd>
          <span>to dispatch</span>
        </div>
      </div>

      {/* stat strip */}
      <div className="grid grid-cols-6 border-b border-zinc-800 text-[11px]">
        {[
          { k: "providers.online", v: "127", d: "+4" },
          { k: "jobs.active",      v: "38",  d: "+1" },
          { k: "queue.depth",      v: "3",   d: "0" },
          { k: "match.median",     v: "9.4m", d: "−0.3m" },
          { k: "rating.7d",        v: "4.94", d: "+0.02" },
          { k: "incidents.open",   v: "0",   d: "—" },
        ].map((s) => (
          <div key={s.k} className="px-4 py-3 border-r border-zinc-800 last:border-r-0">
            <div className="text-zinc-500 uppercase tracking-wider text-[10px]">{s.k}</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-zinc-100 text-xl font-semibold tabular-nums">{s.v}</span>
              <span className="text-emerald-400 tabular-nums">{s.d}</span>
            </div>
          </div>
        ))}
      </div>

      {/* main grid */}
      <div className="grid grid-cols-12 gap-0">
        {/* sidebar filters */}
        <aside className="col-span-2 border-r border-zinc-800 p-4 text-[11px] space-y-6">
          <div>
            <div className="text-zinc-500 uppercase tracking-wider mb-2">filters</div>
            {[
              ["service", "ALL"],
              ["zone", "MIS-3"],
              ["radius", "1.5km"],
              ["min.rating", "4.80"],
              ["max.eta", "15m"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-1 border-b border-zinc-900">
                <span className="text-zinc-500">{k}</span>
                <span className="text-zinc-200">{v}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="text-zinc-500 uppercase tracking-wider mb-2">services</div>
            {[
              ["WALK",  47],
              ["SIT",   22],
              ["GROOM", 18],
              ["BATH",  24],
              ["TRAIN", 16],
            ].map(([k, n]) => (
              <div key={k as string} className="flex items-center justify-between py-1">
                <span className="flex items-center gap-2">
                  <span className="w-1 h-3 bg-emerald-400/70" />
                  <span className="text-zinc-300">{k}</span>
                </span>
                <span className="text-zinc-500 tabular-nums">{n}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="text-zinc-500 uppercase tracking-wider mb-2">my pets</div>
            {[
              ["luna",   "border collie · 4y"],
              ["miso",   "tabby · 2y"],
              ["arlo",   "shiba · 7y"],
            ].map(([n, m]) => (
              <div key={n as string} className="py-1">
                <div className="text-zinc-200">{n}</div>
                <div className="text-zinc-600 text-[10px]">{m}</div>
              </div>
            ))}
          </div>
        </aside>

        {/* providers table */}
        <section className="col-span-7 border-r border-zinc-800">
          <div className="flex items-center justify-between px-4 h-9 border-b border-zinc-800 text-[11px] text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="text-zinc-200 font-semibold">providers.available</span>
              <span className="text-zinc-600">7 / 127</span>
            </div>
            <div className="flex items-center gap-1">
              {["sort:eta↑", "group:none", "limit:7"].map((c) => (
                <span key={c} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-sm">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <table className="w-full text-[11px] tabular-nums">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-zinc-800">
                <th className="px-3 py-2 font-normal">id</th>
                <th className="px-3 py-2 font-normal">handle</th>
                <th className="px-3 py-2 font-normal">svc</th>
                <th className="px-3 py-2 font-normal">zone</th>
                <th className="px-3 py-2 font-normal text-right">rate</th>
                <th className="px-3 py-2 font-normal text-right">eta</th>
                <th className="px-3 py-2 font-normal text-right">rtg</th>
                <th className="px-3 py-2 font-normal text-right">jobs</th>
                <th className="px-3 py-2 font-normal">status</th>
                <th className="px-3 py-2 font-normal text-right">⌘</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p, i) => (
                <tr
                  key={p.id}
                  className={
                    "border-b border-zinc-900 hover:bg-zinc-900/50 " +
                    (i === 0 ? "bg-emerald-400/5" : "")
                  }
                >
                  <td className="px-3 py-2 text-zinc-500">{p.id}</td>
                  <td className="px-3 py-2 text-zinc-100">{p.name}</td>
                  <td className="px-3 py-2">
                    <span className="px-1.5 py-0.5 bg-zinc-800 text-zinc-300 rounded-sm">{p.svc}</span>
                  </td>
                  <td className="px-3 py-2 text-zinc-400">{p.zone}</td>
                  <td className="px-3 py-2 text-right text-zinc-300">{p.rate}</td>
                  <td className="px-3 py-2 text-right text-emerald-400">{p.eta}</td>
                  <td className="px-3 py-2 text-right text-zinc-200">{p.rtg.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right text-zinc-500">{p.jobs}</td>
                  <td className="px-3 py-2">
                    <span className={statusColor(p.status)}>● {p.status}</span>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <span className="text-zinc-300 hover:text-emerald-400">book↵</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-4 py-2 text-[10px] text-zinc-600 flex items-center justify-between border-t border-zinc-800">
            <span>showing 7 of 127 · filter active: zone=MIS-3, eta&lt;15m</span>
            <span>
              <kbd className="px-1 bg-zinc-900 border border-zinc-700 rounded-sm">j</kbd>{" "}
              <kbd className="px-1 bg-zinc-900 border border-zinc-700 rounded-sm">k</kbd> navigate ·{" "}
              <kbd className="px-1 bg-zinc-900 border border-zinc-700 rounded-sm">↵</kbd> book ·{" "}
              <kbd className="px-1 bg-zinc-900 border border-zinc-700 rounded-sm">/</kbd> filter
            </span>
          </div>
        </section>

        {/* live log + map placeholder */}
        <aside className="col-span-3">
          <div className="border-b border-zinc-800">
            <div className="flex items-center justify-between px-3 h-9 text-[11px] text-zinc-400 border-b border-zinc-800">
              <span className="text-zinc-200 font-semibold">dispatch.log</span>
              <span className="text-emerald-400">● tail</span>
            </div>
            <div className="text-[10.5px] leading-relaxed font-medium">
              {log.map((l, i) => (
                <div key={i} className="px-3 py-1 border-b border-zinc-900/60 flex gap-2">
                  <span className="text-zinc-600 tabular-nums">{l.t}</span>
                  <span
                    className={
                      l.lvl === "WARN" ? "text-amber-400"
                      : l.lvl === "OK"  ? "text-emerald-400"
                      : "text-zinc-500"
                    }
                  >
                    {l.lvl.padEnd(4)}
                  </span>
                  <span className="text-zinc-300 truncate">{l.msg}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between px-3 h-9 text-[11px] text-zinc-400 border-b border-zinc-800">
              <span className="text-zinc-200 font-semibold">zone.MIS-3</span>
              <span className="text-zinc-500">12 prv · 4 jobs</span>
            </div>
            <div
              className="h-56 relative"
              style={{
                background:
                  "repeating-linear-gradient(0deg, #18181b 0 1px, transparent 1px 24px)," +
                  "repeating-linear-gradient(90deg, #18181b 0 1px, transparent 1px 24px)," +
                  "#0b0d0e",
              }}
            >
              {[
                [22, 30, "emerald"],
                [55, 18, "emerald"],
                [70, 60, "emerald"],
                [40, 70, "amber"],
                [85, 40, "emerald"],
                [15, 80, "zinc"],
                [50, 50, "emerald"],
              ].map(([x, y, c], i) => (
                <span
                  key={i}
                  className={
                    "absolute w-1.5 h-1.5 rounded-full " +
                    (c === "emerald" ? "bg-emerald-400" : c === "amber" ? "bg-amber-400" : "bg-zinc-500")
                  }
                  style={{ left: `${x}%`, top: `${y}%` }}
                />
              ))}
              <span className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-emerald-400 animate-ping" />
              <span className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <div className="absolute bottom-2 left-2 text-[10px] text-zinc-500">
                ◉ you · 37.7610, −122.4189
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 p-3 text-[11px] space-y-2">
            <div className="text-zinc-500 uppercase tracking-wider text-[10px]">last booking</div>
            <div className="text-zinc-200">job #84109 · WALK · luna</div>
            <div className="text-zinc-500">
              prv=calderon.m · 32min · rated{" "}
              <span className="text-emerald-400">5.00</span>
            </div>
          </div>
        </aside>
      </div>

      {/* status bar */}
      <footer className="border-t border-zinc-800 px-4 h-7 flex items-center text-[10.5px] text-zinc-500 gap-4">
        <span className="text-emerald-400">NORMAL</span>
        <span>buf 1/1</span>
        <span>ws://dispatch.pawhub.io</span>
        <span className="ml-auto">12:04:21 PT</span>
        <span>cpu 4% · mem 312M · rtt 18ms</span>
      </footer>
    </div>
  );
}
