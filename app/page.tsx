"use client";
import { useState, useEffect } from "react";
import CountdownView from "./components/landing/CountdownView";
import VotingLandingView from "./components/landing/VotingLandingView";
import Background from "./components/shared/Background";

export default function Home() {
  const [isVotingOpen, setIsVotingOpen] = useState(false);
  const [isManualOverride, setIsManualOverride] = useState(false);

  useEffect(() => {
    // 🎯 修改这里的时间来设置自动切换时间（需要与Countdown.tsx中的时间保持一致）
    const targetDate = new Date("2025-10-07T20:00:00-04:00");
    const checkTime = () => {
      if (!isManualOverride) {
        setIsVotingOpen(Date.now() >= targetDate.getTime());
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, [isManualOverride]);

  const toggleState = () => {
    setIsManualOverride(true);
    setIsVotingOpen(!isVotingOpen);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* 临时调试按钮 */}
      <button
        onClick={toggleState}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors"
      >
        Show {isVotingOpen ? "Countdown" : "Voting"} Status
      </button>

      {/* Background Component */}
      <div className="absolute inset-0 -z-10">
        <Background />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 -z-5"></div>

      {isVotingOpen ? <VotingLandingView /> : <CountdownView />}
    </main>
  );
}
