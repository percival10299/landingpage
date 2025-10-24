"use client";
import { useState, useEffect } from "react";
import VotingLandingView from "./components/landing/VotingLandingView";
import Background from "./components/shared/Background";
import SocialMedia from "./components/shared/SocialMedia";


export default function Home() {
  const [isVotingOpen, setIsVotingOpen] = useState(false);
  const [isManualOverride, setIsManualOverride] = useState(false);


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
