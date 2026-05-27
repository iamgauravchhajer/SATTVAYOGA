import { useEffect, useState } from "react";

function getTarget() {
  const t = new Date();
  t.setDate(t.getDate() + 3);
  t.setHours(20, 0, 0, 0);
  return t.getTime();
}

export function Countdown() {
  const [target] = useState(getTarget);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);

  const ready = now !== null;

  const diff = ready ? Math.max(0, target - (now as number)) : 0;
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff / 3_600_000) % 24);
  const m = Math.floor((diff / 60_000) % 60);
  const s = Math.floor((diff / 1000) % 60);

  const Cell = ({ v, l }: { v: number; l: string }) => (
    <div className="flex flex-col items-center rounded-2xl bg-brown px-4 py-3 text-cream shadow-soft sm:px-6 sm:py-4">
      <span className="font-display text-3xl font-bold tabular-nums sm:text-5xl">
        {ready ? String(v).padStart(2, "0") : "--"}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.2em] opacity-80 sm:text-xs">{l}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      <Cell v={d} l="Days" />
      <Cell v={h} l="Hours" />
      <Cell v={m} l="Minutes" />
      <Cell v={s} l="Seconds" />
    </div>
  );
}
