"use client";

import { useEffect, useMemo, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const pad = (n: number) => n.toString().padStart(2, "0");

export default function Countdown() {
  // 🎯 修改这里的时间来设置倒计时目标时间
  // 格式：YYYY-MM-DDTHH:MM:SS-时区偏移
  // 示例：2025-10-03T23:59:59-04:00 (今晚23:59:59，东部时间)
  const target = useMemo(
    () => new Date("2025-10-07T20:00:00-04:00").getTime(),
    []
  );
  const calc = (): TimeLeft => {
    const now = Date.now();
    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  };
  const [left, setLeft] = useState<TimeLeft>(calc());
  useEffect(() => {
    const id = setInterval(() => setLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const isDone =
    left.days === 0 &&
    left.hours === 0 &&
    left.minutes === 0 &&
    left.seconds === 0;
  return (
    <div className="flex flex-col items-center gap-2 text-white">
      <div
        className="text-3xl sm:text-3xl md:text-6xl opacity-80"
        style={{ fontFamily: "'PP Neue Bit', sans-serif" }}
      >
        First episode drops in:
      </div>

      {isDone ? (
        <div className="text-8xl font-bold">We're live!</div>
      ) : (
        <div className="flex items-center gap-3 text-4xl sm:text-6xl md:text-8xl font-semibold tabular-nums">
          <TimeBox label="Days" value={left.days} />
          <span>:</span>
          <TimeBox label="Hours" value={left.hours} />
          <span>:</span>
          <TimeBox label="Minutes" value={left.minutes} />
          <span>:</span>
          <TimeBox label="Seconds" value={left.seconds} />
        </div>
      )}
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="leading-none"
        style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
      >
        {pad(value)}
      </div>
      <div className="text-xs md:text-sm uppercase tracking-wide opacity-70">
        {label}
      </div>
    </div>
  );
}
