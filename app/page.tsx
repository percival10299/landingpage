"use client";
import { useState, useEffect } from "react";
import CountdownView from "./components/landing/CountdownView";
import { isDone } from "./components/landing/Countdown";
import VotingLandingView from "./components/landing/VotingLandingView";
import Background from "./components/shared/Background";
import SocialMedia from "./components/shared/SocialMedia";


export default function Home() {
  const [isVotingOpen, setIsVotingOpen] = useState(false);
  const [isManualOverride, setIsManualOverride] = useState(false);

  // useEffect(() => {
  //   // 🎯 修改这里的时间来设置自动切换时间（需要与Countdown.tsx中的时间保持一致）
  //   const targetDate = new Date("2025-10-07T20:00:00-04:00");
  //   const checkTime = () => {
  //     if (!isManualOverride) {
  //       setIsVotingOpen(Date.now() >= targetDate.getTime());
  //     }
  //   };

  //   checkTime();
  //   const interval = setInterval(checkTime, 1000);
  //   return () => clearInterval(interval);
  // }, [isManualOverride]);

  const toggleState = () => {
    setIsVotingOpen(!isVotingOpen);
  };

  return (
    <main
      className={`w-full "relative overflow-visible min-h-screen" `}
    >
      
      {/* Background Component */}
      <div className="absolute inset-0 -z-10">
        <Background />
      </div>

      <SocialMedia/>

       <VotingLandingView/> 
      
    </main>

  );
}
